﻿using TodoAPI.Models;
using TodoAPI.Models.DTOs;

namespace TodoAPI.Utils
{
    public static class ItemValidator
    {
        public static bool IsValidItem(ItemCreateDTO item, out string message)
        {
            if(item == null)
            {
                message = "Item is empty";
                return false;
            }
            if(string.IsNullOrWhiteSpace(item.Title))
            {
                message = "Invalid title given";
                return false;
            }
            if(!string.IsNullOrEmpty(item.Description) && item.Description.Trim().Length == 0)
            {
                message = "Only white space given";
                return false;
            }
            if (!string.IsNullOrEmpty(item.Comment) && item.Comment.Trim().Length == 0)
            {
                message = "Only white space given";
                return false;
            }
            if(item.Deadline == null)
            {
                message = "Invalid deadline given";
                return false;
            }

            DateTime minDate = DateTime.Now.AddMinutes(5);
            if(item.Deadline < minDate)
            {
                message = "Deadline is too short";
                return false;
            }

            message = "Success";
            return true;
        }

        public static bool IsTitleUnique(string title, IEnumerable<Item> items)
        {
            Item? item = items.FirstOrDefault(obj => obj.Title == title);
            if(item == null)
            {
                return true;
            }
            return false;
        }
    }
}