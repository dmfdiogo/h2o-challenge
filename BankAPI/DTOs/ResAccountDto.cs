namespace BankAPI.DTOs
{
    public class ResAccountDto
    {
        public int Id { get; set; }
        public int AccountNumber { get; set; }
        public decimal Balance { get; set; }
        public ResCustomerDto? Customer { get; set; }
    }
}
