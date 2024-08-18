using Microsoft.AspNetCore.Mvc;
using System.Net;
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
        private readonly ILogger<ItemController> _logger;
        private ApiResponse response;

        public ItemController(IItemRepository repo, ILogger<ItemController> logger)
        {
            _repo = repo;
            response = new ApiResponse();
            _logger = logger;
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
                _logger.LogInformation("Calling GetAllItems");
                IEnumerable<Item> items = await _repo.GetAllItems();
                string message = "No items found";
                if (items.Any())
                {
                    message = "Retrieved items";
                }
                _logger.LogInformation(message);
                CreateResponse(HttpStatusCode.OK, message, items, true);
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                _logger.LogError(ex.Message);
                return BadRequest(response);
            }
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}", Name = "GetItem")]
        public async Task<ActionResult<ApiResponse>> GetItem(int id)
        {
            try
            {
                _logger.LogInformation($"Calling GetItemById with ID: {id}");
                Item? item = await _repo.GetItemById(id);
                if (item == null)
                {
                    CreateResponse(HttpStatusCode.NotFound, "No items found");
                    _logger.LogInformation($"No items found for ID: {id}");
                    return BadRequest(response);
                }
                CreateResponse(HttpStatusCode.OK, "Retrieved item", item, true);
                _logger.LogInformation($"Retievend item for ID: {id}");
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation($"Calling GetAllItems inside Create api");
                IEnumerable<Item> items = await _repo.GetAllItems();

                if (!ItemValidator.IsValidItem(item, items, out message))
                {
                    _logger.LogInformation($"Items is not valid: {message}");
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
                _logger.LogInformation($"Item added");
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation($"Calling GetAllItems inside Update api");
                IEnumerable<Item> items = await _repo.GetAllItems();

                if (!ItemValidator.IsValidItem(id, item, items, out message))
                {
                    CreateResponse(HttpStatusCode.BadRequest, message);
                    _logger.LogInformation($"Item is not valid. Item ID: {id}");
                    return BadRequest(response);
                }

                _logger.LogInformation($"Calling GetItemById with ID: {id}");
                Item? dbItem = await _repo.GetItemById(id);

                dbItem.Title = item.Title;
                dbItem.Description = item.Description;
                dbItem.Comment = item.Comment;
                dbItem.Deadline = item.Deadline;
                dbItem.IsCompleted = item.IsCompleted;
                dbItem.UpdatedDate = DateTime.Now;

                await _repo.UpdateItem(dbItem);
                CreateResponse(HttpStatusCode.OK, "Item updated", item, true);
                _logger.LogInformation($"Item updated. Item ID: {id}");
                return Ok(response);                
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                _logger.LogError(ex.Message);
                return BadRequest(response);
            }
        }

        // DELETE api/<ItemController>/5
        [HttpDelete(Name = "Delete")]
        public async Task<ActionResult<ApiResponse>> Delete(string title)
        {
            try
            {
                _logger.LogInformation($"Calling GetItemByTitle. Title: {title}");
                Item? item = await _repo.GetItemByTitle(title);

                if (item == null)
                {
                    CreateResponse(HttpStatusCode.NotFound, "No such item found");
                    _logger.LogInformation($"No item found with title {title}");
                    return BadRequest(response);
                }
                await _repo.DeleteItem(item);
                CreateResponse(HttpStatusCode.OK, "Item deleted", item, true);
                _logger.LogInformation($"Item deleted. Item Title: {title}");
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                _logger.LogError(ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPost("status", Name = "UpdateCompletionStatus")]
        public async Task<ActionResult<ApiResponse>> UpdateCompletionStatus([FromBody] StatusDTO dto)
        {
            try
            {
                _logger.LogInformation($"Calling GetItemById ID: {dto.Id}");
                Item? item = await _repo.GetItemById(dto.Id);
                if (item == null)
                {
                    CreateResponse(HttpStatusCode.BadRequest, "No such item found");
                    _logger.LogInformation($"No item found with ID: {dto.Id}");
                    return BadRequest(response);
                }

                item.IsCompleted = dto.Status;
                item.UpdatedDate = DateTime.Now;

                await _repo.UpdateItem(item);
                CreateResponse(HttpStatusCode.OK, "Item's completion status updated", item, true);
                _logger.LogInformation($"Updated item completion status. Item ID: {dto.Id}");
                return Ok(response);
            }
            catch (Exception ex)
            {
                CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                _logger.LogError(ex.Message);
                return BadRequest(response);
            }
        }
    }
}
