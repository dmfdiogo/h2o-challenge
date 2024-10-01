using System;

namespace BankAPI.Utilities
{
    public class AccountNumberGenerator
    {
        public static int GenerateAccountNumber()
        {
            //TODO: ensure uniqueness by consulting the database
            var random = new Random();
            return random.Next(100000000, 999999999);
        }
    }
}
