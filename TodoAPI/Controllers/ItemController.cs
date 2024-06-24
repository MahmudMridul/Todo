using Microsoft.AspNetCore.Mvc;
using System.Net;
using TodoAPI.Db;
using TodoAPI.Models;
using TodoAPI.Models.DTOs;
using TodoAPI.Utils;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly TodoContext _db;
        private ApiResponse response;

        public ItemController(TodoContext db)
        {
            _db = db;
            response = new ApiResponse();
        }
        // GET: api/<ItemController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ItemController>
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateItem(ItemDTO item)
        {
            try
            {
                string message = "";
                if (ItemValidation.IsValidItem(item, out message))
                {
                    Item newItem = new Item()
                    {
                        Title = item.Title,
                        Description = item.Description,
                        Comment = item.Comment,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now,
                        Deadline = item.Deadline,
                        IsCompleted = false,
                    };
                    await _db.Items.AddAsync(newItem);
                    await _db.SaveChangesAsync();

                    response.Data = newItem;
                    response.StatusCode = HttpStatusCode.OK;
                    response.Message = "Item added";
                    response.IsSuccess = true;

                    return Ok(response);
                }
                else
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = message;
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        // PUT api/<ItemController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
