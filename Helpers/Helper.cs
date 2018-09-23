using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Helpers
{
    public static class Helper
    {
        public static IEnumerable<T> AsEnumerable<T>(this T self)
        {
            yield return self;
        }

        public static string GetDescription(this Enum source)
        {
            FieldInfo fieldInfo = source.GetType().GetField(source.ToString());

            DescriptionAttribute[] attributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(
                typeof(DescriptionAttribute), false);

            if (attributes.Length > 0) return attributes[0].Description;

            return source.ToString();
        }

        public static bool IsNullOrEmpty(this string str)
        {
            return string.IsNullOrEmpty(str);
        }

        public static bool IsNotEmpty(this string str)
        {
            return !string.IsNullOrEmpty(str);
        }

        public static bool IsCorrectEmail(this string str)
        {
            if (str.IsNullOrEmpty())
                return false;

            var rule = new Regex(@"\A[a-z0-9-_\.]+@[a-z0-9-_\.]+\.[a-z0-9-_\.]+$", RegexOptions.IgnoreCase);
            return rule.IsMatch(str);
        }

        public static bool IsCorrectPhone(this string str)
        {
            if (str.IsNullOrEmpty())
                return false;

            var rule = new Regex(@"\A[0-9]{4,12}$");
            return rule.IsMatch(str);
        }
    }
}
