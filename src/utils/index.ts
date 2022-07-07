export class CommonUtils {
  static updateVO = (vo: any, data: any): void => {
    if (!data) return;
    for (const key in data) {
      const voKey = key;
      if (Object.prototype.hasOwnProperty.call(vo, voKey)) {
        vo[voKey] = data[key];
      }
    }
  };
}
