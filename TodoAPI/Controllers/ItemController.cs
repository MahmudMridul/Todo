using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using TodoAPI.Db;
using TodoAPI.Models;
using TodoAPI.Models.DTOs;
using TodoAPI.Repository.IRepository;
using TodoAPI.Utils;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly TodoContext _db;
        private readonly IItemRepository _repo;
        private ApiResponse response;

        public ItemController(TodoContext db, IItemRepository repo)
        {
            _db = db;
            _repo = repo;
            response = new ApiResponse();
        }

        private void CreateResponse(HttpStatusCode statusCode, string message, object? data = null, bool isSuccess = false)
        {
            response.Data = data;
            response.StatusCode = statusCode;
            response.Message = message;
            response.IsSuccess = isSuccess;
        }

        // GET: api/<ItemController>
        [HttpGet(Name = "GetAllItems")]
        public async Task<ActionResult<ApiResponse>> GetAllItems()
        {
            try
            {
                IEnumerable<Item> items = await _repo.GetAllItems();
                string message = "No items found";
                if (items.Any())
                {
                    message = "Retrieved items";
                }
                CreateResponse(HttpStatusCode.OK, message, items, true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return BadRequest(response);
            }
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}", Name = "GetItem")]
        public async Task<ActionResult<ApiResponse>> GetItem(int id)
        {
            try
            {
                Item? item = await _db.Items.FirstOrDefaultAsync(obj => obj.Id == id);
                if (item == null)
                {
                    response.Message = "No items found";
                    response.StatusCode = HttpStatusCode.NotFound;
                    return BadRequest(response);
                }

                response.Message = "Retrieved item";
                response.Data = item;
                response.IsSuccess = true;
                response.StatusCode = HttpStatusCode.OK;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        // POST api/<ItemController>
        [HttpPost(Name = "Create")]
        public async Task<ActionResult<ApiResponse>> Create([FromBody] ItemCreateDTO item)
        {
            try
            {
                string message = "";
                IEnumerable<Item> items = await _db.Items.ToListAsync();

                if (!ItemValidator.IsValidItem(item, items, out message))
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = message;
                    return BadRequest(response);
                }

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
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        // PUT api/<ItemController>/5
        [HttpPut(Name = "Update")]
        public async Task<ActionResult<ApiResponse>> Update(int id, ItemUpdateDTO item)
        {
            try
            {
                string message = "";
                IEnumerable<Item> items = await _db.Items.ToListAsync();

                if (!ItemValidator.IsValidItem(id, item, items, out message))
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = message;
                    return BadRequest(response);
                }

                Item? dbItem = await _db.Items.FindAsync(id);

                dbItem.Title = item.Title;
                dbItem.Description = item.Description;
                dbItem.Comment = item.Comment;
                dbItem.Deadline = item.Deadline;
                dbItem.IsCompleted = item.IsCompleted;
                dbItem.UpdatedDate = DateTime.Now;

                _db.Items.Update(dbItem);
                await _db.SaveChangesAsync();

                response.Data = item;
                response.StatusCode = HttpStatusCode.OK;
                response.Message = "Item updated";
                response.IsSuccess = true;
                return Ok(response);                
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        // DELETE api/<ItemController>/5
        [HttpDelete(Name = "Delete")]
        public async Task<ActionResult<ApiResponse>> Delete(string title)
        {
            try
            {
                Item? item = await _db.Items.FirstOrDefaultAsync(obj => obj.Title == title);

                if (item == null)
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = "No such item found";
                    return BadRequest(response);
                }
                _db.Remove(item);
                await _db.SaveChangesAsync();

                response.Data = item;
                response.StatusCode = HttpStatusCode.OK;
                response.IsSuccess = true;
                response.Message = "Item deleted";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("status", Name = "UpdateCompletionStatus")]
        public async Task<ActionResult<ApiResponse>> UpdateCompletionStatus([FromBody] StatusDTO dto)
        {
            try
            {
                Item? item = await _db.Items.FirstOrDefaultAsync(obj => obj.Id == dto.Id);
                if (item == null)
                {
                    response.StatusCode = HttpStatusCode.BadRequest;
                    response.Message = "No such item found";
                    return BadRequest(response);
                }

                item.IsCompleted = dto.Status;
                item.UpdatedDate = DateTime.Now;

                _db.Items.Update(item);
                await _db.SaveChangesAsync();

                response.Data = item;
                response.StatusCode = HttpStatusCode.OK;
                response.Message = "Item's completion status updated";
                response.IsSuccess = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.Message = ex.Message;
                return BadRequest(response);
            }
        }
    }
}
