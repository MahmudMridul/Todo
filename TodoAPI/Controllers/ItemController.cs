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
        private readonly IItemRepository _repo;
        private ApiResponse response;

        public ItemController(IItemRepository repo)
        {
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
                Item? item = await _repo.GetItemById(id);
                if (item == null)
                {
                    CreateResponse(HttpStatusCode.NotFound, "No items found");
                    return BadRequest(response);
                }
                CreateResponse(HttpStatusCode.OK, "Retrieved item", item, true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
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
                IEnumerable<Item> items = await _repo.GetAllItems();

                if (!ItemValidator.IsValidItem(item, items, out message))
                {
                    CreateResponse(HttpStatusCode.BadRequest, message);
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
                await _repo.CreateItem(newItem);
                CreateResponse(HttpStatusCode.OK, "Item added", newItem, true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
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
                IEnumerable<Item> items = await _repo.GetAllItems();

                if (!ItemValidator.IsValidItem(id, item, items, out message))
                {
                    CreateResponse(HttpStatusCode.BadRequest, message);
                    return BadRequest(response);
                }

                Item? dbItem = await _repo.GetItemById(id);

                dbItem.Title = item.Title;
                dbItem.Description = item.Description;
                dbItem.Comment = item.Comment;
                dbItem.Deadline = item.Deadline;
                dbItem.IsCompleted = item.IsCompleted;
                dbItem.UpdatedDate = DateTime.Now;

                await _repo.UpdateItem(dbItem);
                CreateResponse(HttpStatusCode.OK, "Item updated", item, true);
                return Ok(response);                
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return BadRequest(response);
            }
        }

        // DELETE api/<ItemController>/5
        [HttpDelete(Name = "Delete")]
        public async Task<ActionResult<ApiResponse>> Delete(string title)
        {
            try
            {
                Item? item = await _repo.GetItemByTitle(title);

                if (item == null)
                {
                    CreateResponse(HttpStatusCode.NotFound, "No such item found");
                    return BadRequest(response);
                }
                await _repo.DeleteItem(item);
                CreateResponse(HttpStatusCode.OK, "Item deleted", item, true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPost("status", Name = "UpdateCompletionStatus")]
        public async Task<ActionResult<ApiResponse>> UpdateCompletionStatus([FromBody] StatusDTO dto)
        {
            try
            {
                Item? item = await _repo.GetItemById(dto.Id);
                if (item == null)
                {
                    CreateResponse(HttpStatusCode.BadRequest, "No such item found");
                    return BadRequest(response);
                }

                item.IsCompleted = dto.Status;
                item.UpdatedDate = DateTime.Now;

                await _repo.UpdateItem(item);
                CreateResponse(HttpStatusCode.OK, "Item's completion status updated", item, true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return BadRequest(response);
            }
        }
    }
}
