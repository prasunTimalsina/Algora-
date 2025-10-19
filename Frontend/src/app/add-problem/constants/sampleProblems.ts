import type { TProblem } from '../../../types/schema'

export const SAMPLE_PROBLEMS: Record<'dp' | 'string', TProblem> = {
  dp: {
    title: 'Reverse String',
    description:
      'Given a string s, reverse it and print the reversed string.\n\nInput: A single line containing the string (length ≤ 10^5).\nOutput: The reversed string.',
    difficulty: 'EASY',
    tags: ['String'],
    constraints: 'Length of s ≤ 100000',
    testcases: [
      { input: 'hello', output: 'olleh' },
      { input: 'a', output: 'a' },
      { input: 'racecar', output: 'racecar' },
      { input: 'Dashain', output: 'niahsad' },
    ],
    examples: {
      JAVASCRIPT: {
        input: 'hello',
        output: 'olleh',
        explanation: 'reverse of hello is olleh',
      },
      PYTHON: {
        input: 'abc',
        output: 'cba',
        explanation: 'reverse of abc',
      },
      JAVA: {
        input: 'madam',
        output: 'madam',
        explanation: 'palindrome',
      },
    },
    codeSnippets: {
      JAVASCRIPT:
        "const s = require('fs').readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\nconsole.log(s.split('').reverse().join(''))",
      PYTHON: "import sys\ns = sys.stdin.read().rstrip('\\n')\nprint(s[::-1])",
      JAVA: 'import java.util.*;\npublic class Main{\n  public static void main(String[] args){\n    Scanner sc = new Scanner(System.in);\n    String s = sc.nextLine();\n    StringBuilder sb = new StringBuilder(s);\n    System.out.println(sb.reverse().toString());\n  }\n}',
    },
    referenceSolutions: {
      JAVASCRIPT:
        "const s = require('fs').readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\nconsole.log(s.split('').reverse().join(''))",
      PYTHON: "import sys\ns = sys.stdin.read().rstrip('\\n')\nprint(s[::-1])",
      JAVA: 'import java.util.*;\npublic class Main{\n  public static void main(String[] args){\n    Scanner sc = new Scanner(System.in);\n    String s = sc.nextLine();\n    StringBuilder sb = new StringBuilder(s);\n    System.out.println(sb.reverse().toString());\n  }\n}',
    },
    hints: 'Use string slicing or in-place two-pointer reversal.',
    followUpQuestion:
      'Do it in-place if the language allows mutable strings (or as a char array).',
  },

  string: {
    title: 'Palindrome Number',
    description: `Given an integer, determine if it is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Input: A single integer n
Output: "Yes" if it's a palindrome, "No" otherwise

Note: Negative numbers are not palindromes.`,
    difficulty: 'EASY',
    tags: ['Math', 'String'],
    constraints: '-2^31 ≤ n ≤ 2^31 - 1',
    testcases: [
      { input: '121', output: 'Yes' },
      { input: '-121', output: 'No' },
      { input: '10', output: 'No' },
      { input: '0', output: 'Yes' },
      { input: '12321', output: 'Yes' },
    ],
    examples: {
      JAVASCRIPT: {
        input: '121',
        output: 'Yes',
        explanation: '121 reads the same backward as forward',
      },
      PYTHON: {
        input: '-121',
        output: 'No',
        explanation: 'Negative numbers are not palindromes',
      },
      JAVA: {
        input: '10',
        output: 'No',
        explanation: '10 reversed is 01, which is different from 10',
      },
    },
    codeSnippets: {
      JAVASCRIPT: `// Read input
const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

// Write your solution here
// Check if n is a palindrome
// Use console.log("Yes") or console.log("No")

console.log(result);`,
      PYTHON: `import sys

# Read input  
n = int(sys.stdin.read().strip())

# Write your solution here
# Check if n is a palindrome
# Use print("Yes") or print("No")

print(result)`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Read input
        int n = sc.nextInt();
        
        // Write your solution here
        // Check if n is a palindrome
        // Use System.out.println("Yes") or System.out.println("No")
        
        System.out.println(result);
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

if (n < 0) {
    console.log("No");
} else {
    const str = n.toString();
    const reversed = str.split('').reverse().join('');
    console.log(str === reversed ? "Yes" : "No");
}`,
      PYTHON: `import sys

n = int(sys.stdin.read().strip())

if n < 0:
    print("No")
else:
    str_n = str(n)
    reversed_n = str_n[::-1]
    print("Yes" if str_n == reversed_n else "No")`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        if (n < 0) {
            System.out.println("No");
        } else {
            String str = String.valueOf(n);
            String reversed = new StringBuilder(str).reverse().toString();
            System.out.println(str.equals(reversed) ? "Yes" : "No");
        }
    }
}`,
    },
    hints:
      'Convert the number to string and compare with its reverse. Remember that negative numbers cannot be palindromes.',
    followUpQuestion:
      'Can you solve this without converting the integer to a string?',
  },
}
