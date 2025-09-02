export class StringUtil{
  static capitalize(name: string): string {
    const lowerCaseWords = ['de', 'da', 'do', 'das', 'dos', 'e'];
    return name.split(' ').map((word, index) => {
      if (lowerCaseWords.includes(word.toLowerCase()) && index !== 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }
}
