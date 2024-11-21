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
    public class ItemCadastroController : ControllerBase
    {
        private readonly ItemContext _context;

        public ItemCadastroController(ItemContext context)
        {
            _context = context;
        }

        // GET: api/ItemCadastro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemCadastro>>> GetItemCadastros()
        {
            return await _context.ItemCadastros.ToListAsync();
        }

        // GET: api/ItemCadastro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemCadastro>> GetItemCadastro(int id)
        {
            var itemCadastro = await _context.ItemCadastros.FindAsync(id);

            if (itemCadastro == null)
            {
                return NotFound();
            }

            return itemCadastro;
        }

        // PUT: api/ItemCadastro/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemCadastro(int id, ItemCadastro itemCadastro)
        {
            if (id != itemCadastro.IdItem)
            {
                return BadRequest();
            }

            _context.Entry(itemCadastro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemCadastroExists(id))
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

        // POST: api/ItemCadastro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ItemCadastro>> PostItemCadastro(ItemCadastro itemCadastro)
        {
            _context.ItemCadastros.Add(itemCadastro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItemCadastro", new { id = itemCadastro.IdItem }, itemCadastro);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadItem(IFormFile imagem, [FromForm] string nome, [FromForm] int quantidade, [FromForm] string? descricao)
        {
            using var memoryStream = new MemoryStream();
            await imagem.CopyToAsync(memoryStream);
            var item = new ItemCadastro
            {
                NomeItem = nome,
                Quantidade = quantidade,
                Descricao = descricao,
                ImagemItem = memoryStream.ToArray() // Converte a imagem para um array de bytes
            };

            _context.ItemCadastros.Add(item);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Item salvo com sucesso!" });
        }



        // DELETE: api/ItemCadastro/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemCadastro(int id)
        {
            var itemCadastro = await _context.ItemCadastros.FindAsync(id);
            if (itemCadastro == null)
            {
                return NotFound();
            }

            _context.ItemCadastros.Remove(itemCadastro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemCadastroExists(int id)
        {
            return _context.ItemCadastros.Any(e => e.IdItem == id);
        }
    }
}
