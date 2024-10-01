using AutoMapper;
using BankAPI.DTOs;
using BankAPI.Entity;
using BankAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BankAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ICustomerService _customerService;
        private readonly IMapper _mapper;

        public AccountController(IAccountService accountService, ICustomerService customerService, IMapper mapper)
        {
            _accountService = accountService;
            _customerService = customerService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> AddAccount(ReqCreateAccountDto createAccountDto)
        {
            var customer = await _customerService.GetCustomerByIdAsync(createAccountDto.CustomerId);
            if (customer == null)
            {
                return BadRequest("Customer does not exist.");
            }

            var account = _mapper.Map<Account>(createAccountDto);
            account.Customer = customer;

            await _accountService.AddAccountAsync(account);

            customer.Accounts.Add(account);
            await _customerService.UpdateCustomerAsync(customer);

            return CreatedAtAction(nameof(GetAccountById), new { id = account.Id }, account);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResAccountDto>> GetAccountById(int id)
        {
            var account = await _accountService.GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAccount(int id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }
            await _accountService.UpdateAccountAsync(account);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAccount(int id)
        {
            await _accountService.DeleteAccountAsync(id);
            return NoContent();
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<ResAccountDto>>> GetAllAccountsAsync()
        {
            var accounts = await _accountService.GetAllAccountsAsync();
            var accountDtos = _mapper.Map<List<ResAccountDto>>(accounts);
            return Ok(accountDtos);
        }
    }
}
