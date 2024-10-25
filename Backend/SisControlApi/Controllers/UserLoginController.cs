using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SisControlApi.Models;

namespace SisControlApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly UserContext _context;

        public UserLoginController(UserContext context)
        {
            _context = context;
        }

        // GET: api/UserLogin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserLogin>>> GetUserLogin()
        {
            return await _context.UserLogin.ToListAsync();
        }

        // GET: api/UserLogin/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserLogin>> GetUserLogin(int id)
        {
            var userLogin = await _context.UserLogin.FindAsync(id);

            if (userLogin == null)
            {
                return NotFound();
            }

            return userLogin;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin loginRequest)
        {
            // Verifica as credenciais na tabela "userlogin"
            var user = await _context.UserLogin
                                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Email ou senha incorretos" });
            }

            // Se o login for bem-sucedido, atualiza o DateLogin
            user.DateLogin = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Login efetuado com sucesso", userId = user.Id });
        }
    }
}
