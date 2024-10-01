using AutoMapper;
using BankAPI.DataAccess;
using BankAPI.DTOs;
using BankAPI.Entity;
using BankAPI.Utilities;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AccountService> _logger;
        private readonly IMapper _mapper;

        public AccountService(ApplicationDbContext context, ILogger<AccountService> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Account>> GetAllAccountsAsync()
        {
            try
            {
                return await _context.Accounts
                    .Include(a => a.Customer)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving all accounts.");
                throw new ApplicationException("An error occurred while retrieving all accounts.", ex);
            }
        }

        public async Task<ResAccountDto> GetAccountByIdAsync(int id)
        {
            try
            {
                var account = await _context.Accounts
                    .Include(a => a.Customer)
                    .FirstOrDefaultAsync(a => a.Id == id);

                return _mapper.Map<ResAccountDto>(account);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while retrieving the account with ID {id}.");
                throw new ApplicationException($"An error occurred while retrieving the account with ID {id}.", ex);
            }
        }

        public async Task AddAccountAsync(Account account)
        {
            try
            {
                var number = AccountNumberGenerator.GenerateAccountNumber();
                account.AccountNumber = number;
                account.Balance = 0;
                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "A database error occurred while adding the account.");
                throw new ApplicationException("A database error occurred while adding the account.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while adding the account.");
                throw new ApplicationException("An error occurred while adding the account.", ex);
            }
        }

        public async Task UpdateAccountAsync(Account account)
        {
            try
            {
                _context.Entry(account).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException dbEx)
            {
                _logger.LogError(dbEx, "A concurrency error occurred while updating the account.");
                throw new ApplicationException("A concurrency error occurred while updating the account.", dbEx);
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "A database error occurred while updating the account.");
                throw new ApplicationException("A database error occurred while updating the account.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the account.");
                throw new ApplicationException("An error occurred while updating the account.", ex);
            }
        }

        public async Task DeleteAccountAsync(int id)
        {
            try
            {
                var account = await _context.Accounts.FindAsync(id);
                if (account != null)
                {
                    _context.Accounts.Remove(account);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _logger.LogWarning($"Account with ID {id} not found.");
                    throw new KeyNotFoundException($"Account with ID {id} not found.");
                }
            }
            catch (DbUpdateException dbEx)
            {
                _logger.LogError(dbEx, "A database error occurred while deleting the account.");
                throw new ApplicationException("A database error occurred while deleting the account.", dbEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the account.");
                throw new ApplicationException("An error occurred while deleting the account.", ex);
            }
        }
    }
}
