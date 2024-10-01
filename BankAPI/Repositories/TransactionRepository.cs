using BankAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace BankAPI.DataAccess
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> GetTransactionsAsync(
            int? accountNumber = null,
            int? targetAccountNumber = null,
            decimal? minAmount = null,
            decimal? maxAmount = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TransactionType? type = null,
            int page = 1,
            int pageSize = 10)
        {
            var query = _context.Transactions.AsQueryable();

            if (accountNumber.HasValue)
            {
                query = query.Where(t => t.AccountNumber == accountNumber.Value);
            }

            if (targetAccountNumber.HasValue)
            {
                query = query.Where(t => t.TargetAccountNumber == targetAccountNumber.Value);
            }

            if (minAmount.HasValue)
            {
                query = query.Where(t => t.Amount >= minAmount.Value);
            }

            if (maxAmount.HasValue)
            {
                query = query.Where(t => t.Amount <= maxAmount.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(t => t.TransactionDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(t => t.TransactionDate <= endDate.Value);
            }

            if (type.HasValue)
            {
                query = query.Where(t => t.Type == type.Value);
            }

            query = query.OrderBy(t => t.TransactionDate);

            return await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
        }
    }
}
