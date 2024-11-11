using System.Text.RegularExpressions;

namespace CustomerPortalAPI.Server
{
    public static class InputValidator
    {
        public static bool IsValidUsername(string username)
        {
            
            var regex = new Regex("^[a-zA-Z0-9_]+$");
            return regex.IsMatch(username);
        }

        public static bool IsValidEmail(string email)
        {
            
            var regex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return regex.IsMatch(email);
        }
    }

}
