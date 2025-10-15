import type { TProblemInput } from '../../../types/schema'

export const SAMPLE_PROBLEMS: Record<string, TProblemInput> = {
  dp: {
    title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
- Input: n = 2
- Output: 2
- Explanation: There are two ways to climb to the top.
  1. 1 step + 1 step
  2. 2 steps

**Example 2:**
- Input: n = 3
- Output: 3
- Explanation: There are three ways to climb to the top.
  1. 1 step + 1 step + 1 step
  2. 1 step + 2 steps
  3. 2 steps + 1 step`,
    difficulty: 'EASY' as const,
    tags: ['Dynamic Programming', 'Math', 'Memoization'],
    constraints: `- 1 <= n <= 45
- The answer is guaranteed to fit in a 32-bit integer`,
    hints:
      'Think about this problem as building the solution bottom-up. How many ways can you reach step i if you know the number of ways to reach step i-1 and step i-2?',
    followUpQuestion:
      'Can you solve this problem in O(1) space complexity instead of O(n)?',
    testcases: [
      { input: '2', output: '2' },
      { input: '3', output: '3' },
      { input: '4', output: '5' },
      { input: '5', output: '8' },
      { input: '1', output: '1' },
    ],
    examples: {
      JAVASCRIPT: {
        input: 'n = 2',
        output: '2',
        explanation:
          'There are two ways to climb to the top: 1+1 steps or 2 steps',
      },
      PYTHON: {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: 1+1+1, 1+2, or 2+1 steps',
      },
      JAVA: {
        input: 'n = 4',
        output: '5',
        explanation: 'Five ways: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2',
      },
    },
    codeSnippets: {
      JAVASCRIPT: `function climbStairs(n) {
    // Write your solution here
    // Hint: Use dynamic programming
}`,
      PYTHON: `def climbStairs(n):
    """
    :type n: int
    :rtype: int
    """
    # Write your solution here
    # Hint: Use dynamic programming
    pass`,
      JAVA: `public class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        // Hint: Use dynamic programming
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function climbStairs(n) {
    if (n <= 1) return 1;
    
    let prev1 = 1, prev2 = 1;
    
    for (let i = 2; i <= n; i++) {
        let current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}`,
      PYTHON: `def climbStairs(n):
    if n <= 1:
        return 1
    
    prev1, prev2 = 1, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1`,
      JAVA: `public class Solution {
    public int climbStairs(int n) {
        if (n <= 1) return 1;
        
        int prev1 = 1, prev2 = 1;
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}`,
    },
  },

  string: {
    title: 'Valid Palindrome',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

**Example 1:**
- Input: s = "A man, a plan, a canal: Panama"
- Output: true
- Explanation: "amanaplanacanalpanama" is a palindrome.

**Example 2:**
- Input: s = "race a car"
- Output: false
- Explanation: "raceacar" is not a palindrome.`,
    difficulty: 'EASY' as const,
    tags: ['Two Pointers', 'String'],
    constraints: `- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters`,
    hints:
      'Use two pointers approach. Start from both ends and move towards the center, skipping non-alphanumeric characters.',
    followUpQuestion:
      'How would you modify this solution to find the longest palindromic substring instead?',
    testcases: [
      { input: '"A man, a plan, a canal: Panama"', output: 'true' },
      { input: '"race a car"', output: 'false' },
      { input: '" "', output: 'true' },
      { input: '"Madam"', output: 'true' },
      { input: '"No \'x\' in Nixon"', output: 'true' },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation:
          'After processing: "amanaplanacanalpanama" which reads the same forwards and backwards',
      },
      PYTHON: {
        input: 's = "race a car"',
        output: 'false',
        explanation:
          'After processing: "raceacar" which does not read the same forwards and backwards',
      },
      JAVA: {
        input: 's = " "',
        output: 'true',
        explanation:
          'After removing non-alphanumeric characters, we get an empty string which is considered a palindrome',
      },
    },
    codeSnippets: {
      JAVASCRIPT: `function isPalindrome(s) {
    // Write your solution here
    // Hint: Use two pointers and process the string
}`,
      PYTHON: `def isPalindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your solution here
    # Hint: Use two pointers and process the string
    pass`,
      JAVA: `public class Solution {
    public boolean isPalindrome(String s) {
        // Write your solution here
        // Hint: Use two pointers and process the string
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
}`,
      PYTHON: `def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric characters from left
        while left < right and not s[left].isalnum():
            left += 1
        
        # Skip non-alphanumeric characters from right  
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True`,
      JAVA: `public class Solution {
    public boolean isPalindrome(String s) {
        int left = 0;
        int right = s.length() - 1;
        
        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            
            // Skip non-alphanumeric characters from right
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            
            // Compare characters (case-insensitive)
            if (Character.toLowerCase(s.charAt(left)) != 
                Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
}`,
    },
  },
}
