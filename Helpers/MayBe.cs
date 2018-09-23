using System;
using System.Collections.Generic;
using System.Linq;

namespace Helpers
{
    public static class MayBe
    {
        /// <summary>
        /// Возвращает null, если первый аргумент null, иначе возвращает результат функции
        /// </summary>
        public static TResult With<TInput, TResult>(this TInput input, Func<TInput, TResult> evaluatingFunc)
            where TInput : class
            where TResult : class
        {
            if (input == null)
                return null;

            return evaluatingFunc(input);
        }


        /// <summary>
        /// Возвращает null, если первый аргумент null, иначе возвращает результат функции
        /// </summary>
        public static TResult? WithStruct<TInput, TResult>(this TInput input, Func<TInput, TResult> evaluatingFunc)
            where TInput : class
            where TResult : struct 
        {
            if (input == null)
                return null;

            return evaluatingFunc(input);
        }

        public static IEnumerable<T> WithEnumerable<T>(this IEnumerable<T> source)
        {
            return source ?? Enumerable.Empty<T>();
        }
    }
}
