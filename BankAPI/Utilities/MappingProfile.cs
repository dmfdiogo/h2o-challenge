using AutoMapper;
using BankAPI.DTOs;
using BankAPI.Entity;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Account, ResAccountDto>();
        CreateMap<Customer, ResCustomerDto>();
        CreateMap<ReqCreateCustomerDto, Customer>();

        CreateMap<ReqCreateAccountDto, Account>()
               .ForMember(dest => dest.Customer, opt => opt.Ignore());

        CreateMap<ReqTransactionDto, Transaction>()
               .ForMember(dest => dest.TransactionDate, opt => opt.MapFrom(src => DateTime.UtcNow));
    }
}
