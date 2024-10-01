using AutoMapper;
using BankAPI.DTOs;
using BankAPI.Entity;
using BankAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BankAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly ICustomerService _customerService;
        private readonly IMapper _mapper;

        public AuthController(IAuthenticationService authenticationService, ICustomerService customerService, IMapper mapper)
        {
            _authenticationService = authenticationService;
            _customerService = customerService;
            _mapper = mapper;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ReqLoginDto request)
        {
            var customer = await _authenticationService.Authenticate(request.Username, request.Password);
            if (customer == null)
            {
                return Unauthorized();
            }

            var token = _authenticationService.GetAuthToken(customer);
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ReqCreateCustomerDto createCustomerDto)
        {
            var customer = _mapper.Map<Customer>(createCustomerDto);

            var createdCustomer = await _customerService.AddCustomerAsync(customer);
            if (createdCustomer != null)
            {
                var token = _authenticationService.GetAuthToken(createdCustomer);
                return Ok(new { Token = token });
            }
            return BadRequest("Customer could not be created.");
        }
    }
}
