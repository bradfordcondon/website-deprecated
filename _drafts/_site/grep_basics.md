


## Grep cheatsheet

NOTE these are for me.  If I wanted to post this, I should generate my own examples.
https://www.panix.com/~elflord/unix/grep.html


basic:
Return lines matching a search time:
`grep 'searchterm' file`


##

### `?` operator

>an expression consisting of a character followed by an escaped question mark matches one or zero instances of that character.


`bugg\?y` matches all of the following: bugy, buggy but not bugggy 

So, that second g becomes *optional* thanks to `\?`

### `\(stuff\)`
>An expression surrounded by "escaped" parentheses is treated by a single character.

`Fred\(eric\)\?` 
So combine.  We search for Fred, and we allow, optionally, the single character **eric** afterwards.


## Matching a list of characters

`[]` matches a list.

```
[0-3] is the same as [0123] 
[a-k] is the same as [abcdefghijk]
[A-C] is the same as [ABC]
[A-Ca-k] is the same as 
[ABCabcdefghijk]
```

useful full text:

```
[[:alpha:]] is the same as [a-zA-Z]
[[:upper:]] is the same as [A-Z]
[[:lower:]] is the same as [a-z]
[[:digit:]] is the same as [0-9]
[[:alnum:]] is the same as [0-9a-zA-Z]
[[:space:]] matches any white space including tabs
```

>The [] may be used to search for non-matches. This is done by putting a carat ^ as the first character inside the square brackets.

### Non matches with [^]
`[^7091] Will exclude 7, 0, 9, and 1


### Matching a Specific Number Of Repetitions of a Pattern

This grep searches for phone numbers.
` "[[:digit:]]\{3\}[ -]\?[[:digit:]]\{4\}"`

`[[:digit:]]` any digit
`\{3\}` this searches for any three digits.

`[ -]\?` searches for a dash or white space.  No dash or white space is OK too.

## Matching the start or end of the line

>The $ character matches the end of the line. The ^ character matches the beginning of the line.

`"^From.*mscharmi"` This searches for things where From is the start of the line, then mscharmi is the person im looking for after.

## Matching either/or

`"I am a \(cat\|dog\)"`  this will find I am a cat **or** I am a dog.

## Backreferences
>The expression \n where n is a number, matches the contents of the n'th set of parentheses in the expression

`<H\([1-6]\).*</H\1>`

in other words... we search for H1,2,3,4,5,6 then anything, then a closing tag matching that opening tag.


#special/escaped characters


```
?  \  .  [  ]  ^  $

```