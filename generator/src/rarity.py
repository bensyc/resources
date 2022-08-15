# BENSYC.eth
# args: val
from sympy import isprime
import sys
    
def isAlternating(string):
    if len(string) == 3 and string[0] == string[2] and string[0] != string[1]:
        return(True)
    elif len(string) == 4 and string[0] == string[2] and string[1] == string[3] and string[0] != string[1]:
        return(True)
    else:
        return(False)
        
def isIncrementing(string):
    if len(string) == 3 and int(string[0]) - int(string[1]) == int(string[1]) - int(string[2]) != 0:
        return(True)
    elif len(string) == 4 and int(string[0]) - int(string[1]) == int(string[1]) - int(string[2]) == int(string[2]) - int(string[3]) != 0:
        return(True)
    else:
        return(False)

def getRepeating(string):
    store = []
    for item in set(string):
        store.append(string.count(item))
    if max(store) == len(string):
        return('Rank1')
    elif max(store) < len(string) and len(string) == 4 and max(store) == 3:
        return('Rank2')
    elif max(store) < len(string) and len(string) == 3 and max(store) == 2:
        return('Rank3')
    else:
        return('None')
    
def isPalindrome(string):
    if string == string[::-1] and len(string) > 2:
        flag = True
    else:
        flag = False
    return(flag)

def isEven(num):
    if num % 2 == 0:
        flag = True
    else:
        flag = False
    return(flag)

def isOdd(num):
    if num % 2 != 0:
        flag = True
    else:
        flag = False
    return(flag)

def isPrime(num):
    flag = False
    if isprime(num):
        flag = True
    return(flag)

# MAIN

val = sys.argv[1]
num = int(val)

if isPrime(num) or num <= 9:
    print('Rainbow')
elif isPalindrome(val):
    print('Crystal')
elif isAlternating(val):
    print('Stone')
elif isIncrementing(val):
    print('Jungle')
elif getRepeating(val) == 'Rank1':
    print('Gold')
elif getRepeating(val) == 'Rank2':
    print('Fire')
elif getRepeating(val) == 'Rank3':
    print('Water')
else:
    print('Default')
    

