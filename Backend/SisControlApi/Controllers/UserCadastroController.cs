using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SisControlApi.Models;

namespace SisControlApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCadastroController : ControllerBase
    {
        private readonly UserContext _context;

        public UserCadastroController(UserContext context)
        {
            _context = context;
        }

        // GET: api/UserCadastro - Obter todos os cadastros
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<UserCadastro>>> GetAllUserCadastro()
        {
            return await _context.UserCadastro.ToListAsync();
        }

        // GET: api/UserCadastro/5 - Obter cadastro específico pelo IdUser
        [HttpGet("{IdUser:int}")]
        public async Task<ActionResult<UserCadastro>> GetUserCadastroById(int id)
        {
            var userCadastro = await _context.UserCadastro.FindAsync(id);

            if (userCadastro == null)
            {
                return NotFound();
            }

            return userCadastro;
        }

        // GET: api/UserCadastro/email/{email} - Verificar se o email já existe no banco de dados
        [HttpGet("email/{email}")]
        public async Task<IActionResult> CheckEmail(string email)
        {
            var user = await _context.UserCadastro.FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                return Ok(new { exists = true });
            }

            return Ok(new { exists = false });
        }

        // POST: api/UserCadastro - Cadastrar novo usuário
        [HttpPost]
        public async Task<ActionResult<UserCadastro>> PostUserCadastro(UserCadastro userCadastro)
        {
            userCadastro.DateLogin = DateTime.Now; // Atualiza a data de login

            _context.UserCadastro.Add(userCadastro);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserCadastroExists(userCadastro.Nome))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetUserCadastroById), new { id = userCadastro.IdUser }, userCadastro);
        }

        // POST: api/LoginRequest/login - Login de usuário
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null ||
                string.IsNullOrEmpty(loginRequest.Email) ||
                string.IsNullOrEmpty(loginRequest.PasswordHash))
            {
                return BadRequest(new { message = "Email e senha são obrigatórios." });
            }

            var user = await _context.UserCadastro
                                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.PasswordHash == loginRequest.PasswordHash);

            if (user == null)
            {
                return BadRequest(new { message = "Email ou senha incorretos" });
            }

            user.DateLogin = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Login efetuado com sucesso", idUser = user.IdUser });
        }

        private bool UserCadastroExists(string id)
        {
            return _context.UserCadastro.Any(e => e.Nome == id);
        }
    }
}