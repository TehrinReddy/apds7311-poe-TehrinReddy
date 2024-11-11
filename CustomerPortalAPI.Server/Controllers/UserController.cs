using BCrypt.Net;  
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace CustomerPortalAPI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid data.");
            }

            
            if (!IsValidUsername(model.Username))
            {
                return BadRequest("Invalid username format.");
            }

            if (!IsValidEmail(model.Email))
            {
                return BadRequest("Invalid email format.");
            }

            if (string.IsNullOrEmpty(model.Password) || model.Password.Length < 6)
            {
                return BadRequest("Password must be at least 6 characters long.");
            }

            
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            

            return Ok("User registered successfully.");
        }

        
        private bool IsValidUsername(string username)
        {
            var regex = new Regex("^[a-zA-Z0-9_]+$");
            return regex.IsMatch(username);
        }

        
        private bool IsValidEmail(string email)
        {
            var regex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return regex.IsMatch(email);
        }
    }
}
