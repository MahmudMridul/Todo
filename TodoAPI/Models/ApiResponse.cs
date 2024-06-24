﻿using System.Net;

namespace TodoAPI.Models
{
    public class ApiResponse
    {
        public object? Data { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; } = false;
        public string? Message { get; set; }
    }
}
