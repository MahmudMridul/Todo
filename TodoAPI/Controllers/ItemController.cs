﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ActionResult<ApiResponse>> GetAllItems() 
        {
            try
            {
                IEnumerable<Item> items = await _db.Items.ToListAsync();
                if(items.Count() == 0)
                {
                    response.Message = "No items found";
                }
                else
                {
                    response.Message = "Retrieved items";
                }
                response.Data = items;
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

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
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
        [HttpPost]
        public async Task<ActionResult<ApiResponse>> Create(ItemCreateDTO item)
        {
            try
            {
                string message = "";
                IEnumerable<Item> items = await _db.Items.ToListAsync();

                if(!ItemValidator.IsValidItem(item, items, out message))
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
        [HttpPut]
        public async Task<ActionResult<ApiResponse>> Update(int id, ItemUpdateDTO item)
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

            response.Data = dbItem;
            response.StatusCode = HttpStatusCode.OK;
            response.Message = "Item updated";
            response.IsSuccess = true;
            return Ok(response);
        }

        // DELETE api/<ItemController>/5
        [HttpDelete]
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
    }
}
