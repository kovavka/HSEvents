export class ObjectUtils {
	static deepCopy(object: any): any {
		return Object.assign({}, object);
	}

	static deepCopyArray(array: any[]): any[] {
		var result = [];
		for (var object of array) {
			var copy = this.deepCopy(object);
			result.push(copy);
		}
		return result;
	}
}