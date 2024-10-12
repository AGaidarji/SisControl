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

        // PUT: api/UserCadastro/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserCadastro(string id, UserCadastro userCadastro)
        {
            if (id != userCadastro.Nome)
            {
                return BadRequest();
            }

            _context.Entry(userCadastro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserCadastroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserCadastro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserCadastro>> PostUserCadastro(UserCadastro userCadastro)
        {
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

            return CreatedAtAction("GetUserCadastro", new { id = userCadastro.Nome }, userCadastro);
        }

        // DELETE: api/UserCadastroes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserCadastro(string id)
        {
            var userCadastro = await _context.UserCadastro.FindAsync(id);
            if (userCadastro == null)
            {
                return NotFound();
            }

            _context.UserCadastro.Remove(userCadastro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserCadastroExists(string id)
        {
            return _context.UserCadastro.Any(e => e.Nome == id);
        }
    }
}
