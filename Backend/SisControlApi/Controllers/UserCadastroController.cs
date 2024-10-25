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

        // GET: api/UserCadastro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserCadastro>>> GetUserCadastro()
        {
            return await _context.UserCadastro.ToListAsync();
        }

        // GET: api/UserCadastro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserCadastro>> GetUserCadastro(string id)
        {
            var userCadastro = await _context.UserCadastro.FindAsync(id);

            if (userCadastro == null)
            {
                return NotFound();
            }

            return userCadastro;
        }

        // GET: Serve para pegar o email e verificar se o email ja existe no banco de dados
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

        // POST: api/UserCadastro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserCadastro>> PostUserCadastro(UserCadastro userCadastro)
        {
            // Defina a data de login para o momento atual
            userCadastro.DateLogin = DateTime.Now; // Atualiza a data de login

            _context.UserCadastro.Add(userCadastro);

            try
            {
                await _context.SaveChangesAsync();

                var userLogin = new UserLogin
                {
                    Id = userCadastro.Id,  // Usando o mesmo Id do cadastro
                    Email = userCadastro.Email,
                    Password = userCadastro.Password,
                    DateLogin = DateTime.Now // Apenas inicializando, será atualizado no login
                };

                _context.UserLogin.Add(userLogin);
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

            return CreatedAtAction("GetUserCadastro", new { id = userCadastro.Nome }, userCadastro);
        }

        private bool UserCadastroExists(string id)
        {
            return _context.UserCadastro.Any(e => e.Nome == id);
        }
    }
}
