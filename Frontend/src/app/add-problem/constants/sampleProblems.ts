import type { TProblemInput } from '../../../types/schema'

export const SAMPLE_PROBLEMS: Record<'dp' | 'string', TProblemInput> = {
  dp: {
    title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Input: A single integer n (1 ≤ n ≤ 45)
Output: Number of distinct ways to reach the top`,
    difficulty: 'EASY',
    tags: ['Dynamic Programming', 'Math', 'Memoization'],
    constraints: '1 ≤ n ≤ 45',
    testcases: [
      { input: '2', output: '2' },
      { input: '3', output: '3' },
      { input: '1', output: '1' },
      { input: '5', output: '8' },
    ],
    examples: {
      JAVASCRIPT: {
        input: '3',
        output: '3',
        explanation: 'There are 3 ways: (1+1+1), (1+2), (2+1)',
      },
      PYTHON: {
        input: '2',
        output: '2',
        explanation: 'There are 2 ways: (1+1), (2)',
      },
      JAVA: {
        input: '4',
        output: '5',
        explanation:
          'There are 5 ways: (1+1+1+1), (1+1+2), (1+2+1), (2+1+1), (2+2)',
      },
    },
    codeSnippets: {
      JAVASCRIPT: `// Read input
const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

// Write your solution here
// Use console.log() to output the result

console.log(result);`,
      PYTHON: `import sys

# Read input
n = int(sys.stdin.read().strip())

# Write your solution here
# Use print() to output the result

print(result)`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Read input
        int n = sc.nextInt();
        
        // Write your solution here
        // Use System.out.println() to output the result
        
        System.out.println(result);
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

if (n <= 2) {
    console.log(n);
} else {
    let dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    console.log(dp[n]);
}`,
      PYTHON: `import sys

n = int(sys.stdin.read().strip())

if n <= 2:
    print(n)
else:
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    print(dp[n])`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        if (n <= 2) {
            System.out.println(n);
        } else {
            int[] dp = new int[n + 1];
            dp[1] = 1;
            dp[2] = 2;
            
            for (int i = 3; i <= n; i++) {
                dp[i] = dp[i-1] + dp[i-2];
            }
            
            System.out.println(dp[n]);
        }
    }
}`,
    },
    hints:
      'Think about how many ways you can reach step n from step n-1 and n-2. This follows the Fibonacci sequence pattern.',
    followUpQuestion:
      'Can you solve this with O(1) space complexity instead of O(n)?',
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
