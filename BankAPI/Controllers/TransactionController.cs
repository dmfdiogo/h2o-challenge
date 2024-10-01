using AutoMapper;
using BankAPI.DTOs;
using BankAPI.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BankAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly IMapper _mapper;

        public TransactionController(ITransactionService transactionService, IMapper mapper)
        {
            _transactionService = transactionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ResTransactionDto>>> Get(
            [FromQuery] int? accountNumber,
            [FromQuery] int? targetAccountNumber,
            [FromQuery] decimal? minAmount,
            [FromQuery] decimal? maxAmount,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] TransactionType? type,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var transactions = await _transactionService.GetAllTransactionsAsync(
                accountNumber,
                targetAccountNumber,
                minAmount,
                maxAmount,
                startDate,
                endDate,
                type,
                page,
                pageSize);

            if (transactions == null || transactions.Count == 0)
            {
                return Ok(new List<ResTransactionDto>());
            }

            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReqTransactionDto transactionDto)
        {
            if (transactionDto == null)
            {
                return BadRequest("Transaction data is required.");
            }

            var transaction = _mapper.Map<Transaction>(transactionDto);

            await _transactionService.AddTransactionAsync(transaction);
            return CreatedAtAction(nameof(Get), new { id = transaction.TransactionId }, transaction);
        }
    }
}
