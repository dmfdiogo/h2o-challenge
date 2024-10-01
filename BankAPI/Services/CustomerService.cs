using BankAPI.DataAccess;
using BankAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CustomerService> _logger;

        public CustomerService(ApplicationDbContext context, ILogger<CustomerService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            try
            {
                return await _context.Customers.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving all customers.");
                throw new ApplicationException("An error occurred while retrieving all customers.", ex);
            }
        }

        public async Task<Customer> GetCustomerByIdAsync(int id)
        {
            try
            {
                return await _context.Customers
                    .Include(c => c.Accounts)
                    .FirstOrDefaultAsync(c => c.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving the customer with ID {id}.");
                throw new ApplicationException($"An error occurred while retrieving the customer with ID {id}.", ex);
            }
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            try
            {
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                return customer;
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "A database error occurred while adding the customer.");
                throw new ApplicationException("A database error occurred while adding the customer.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the customer.");
                throw new ApplicationException("An error occurred while adding the customer.", ex);
            }
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            try
            {
                _context.Entry(customer).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException dbEx)
            {
                _logger.LogError(dbEx, "A concurrency error occurred while updating the customer.");
                throw new ApplicationException("A concurrency error occurred while updating the customer.", dbEx);
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "A database error occurred while updating the customer.");
                throw new ApplicationException("A database error occurred while updating the customer.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the customer.");
                throw new ApplicationException("An error occurred while updating the customer.", ex);
            }
        }

        public async Task DeleteCustomerAsync(int id)
        {
            try
            {
                var customer = await _context.Customers.FindAsync(id);
                if (customer != null)
                {
                    _context.Customers.Remove(customer);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning($"Customer with ID {id} not found.");
                    throw new KeyNotFoundException($"Customer with ID {id} not found.");
                }
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "A database error occurred while deleting the customer.");
                throw new ApplicationException("A database error occurred while deleting the customer.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the customer.");
                throw new ApplicationException("An error occurred while deleting the customer.", ex);
            }
        }
    }
}
