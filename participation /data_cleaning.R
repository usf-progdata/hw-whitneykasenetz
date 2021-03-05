library(dplyr)
library(tidyr)
library(tibble)
library(psych)
dat_bfi <- psychTools::bfi
key_bfi <- psychTools::bfi.keys

head(dat_bfi)
install.packages("psychTools")
"psychTools"# ==================================================

# getting rid of rownames
#takes away the rownames and turns them into their 
#own column using "var" funcction
#the fuction you do this with is called rownames_to_column
dat_bfi <- dat_bfi %>%
  rownames_to_column(var = ".id")

head(dat_bfi)
filter(dat_bfi, .id == 61617)
#here we selected a specific participant 

# ==================================================

# converting between data.frame and tibble

## data.frame (base R)
psychTools::bfi

## tibble (tibble/tidyverse)
as_tibble(psychTools::bfi, rownames = ".id")

#you can also do
psychTools::bfi %>% 
rownames_to_column(var = ".id") %>% 
  as_tibble()
  
dat_bfi <- as_tibble(dat_bfi)

#those two lines of code are the same thing

#if you want to see 30 participants, tell it to do this 
print(dat_bfi, n = 30)

## tibbles are nice, but some packages (e.g., lavaan) don't play well with them
## In that case, convert back to data.frame
as.data.frame(dat_bfi)


# ==================================================

# recode()
select(dat_bfi, .id, gender, education)

#when you run this line of code you'll see that gender is coded as 1 and 2. 
#let's recode this variable

## Let's recode the categorical variables
#below, I'm saying: make a new variable called "dict", 
#assign to it the values of the bfi dictionary from the psych package
#show it to me as a tibble, and give me a cilumn called "items" for each rowname
#here, the rownames aren't individual participants but rather individual questions

dict <- psychTools::bfi.dictionary %>%
  as_tibble(rownames = "item")

#we use mutate() and then recode() to recode variables (the mutate makes a new column, whereas recode does the recoding)
#the line of code is saying we're mutating this data to make a new column.
# Remember how mutate() and summary() have the form:
#   mutate(.data, new_column = computation)

#recode takes the old variable first and then what you want to mutate it to
#
# recode() is backwards:
#   recode(.x, old = new)

dat_bfi %>%
  mutate(
    gender = recode(gender, "1" = "man", "2" = "female")
  ) %>%
  select(.id, gender, education)
#we are saying here: take bfi data, mutate to make a new variable. we are calling it "gender"
#compute the new "gender" variable by taking gender data, and turning the old value of 1 to man and the old value of 2 to female

## note that for numeric values, you need to wrap them in "quotes" or `backticks`
## That's not necessary for character values
palmerpenguins::penguins %>%
  mutate(sex = recode(sex, male = "Male", female = "Female"))

## Let's look at a few more recode options
?recode

#let's recode education so that we can see their level of education rather than some number
#note that you need to recode each value or it's going to replace the missing ones with missing values and say 'N/A"

dat_bfi %>%
  mutate(
    education = recode(education, "1" = "Some HS", "2" = "HS", "3" = "Some College", "4" = "College", "5" = "Graduate degree")
  ) %>%
  select(.id, gender, education)

## Let's say we want just "HS or less" versus "more than HS"
#the .default argument tells the computer to make everything else default to more than highschool
dat_bfi %>%
  mutate(
    college = recode(education, "1" = "HS", "2" = "HS", .default = "More than HS")
  ) %>%
  select(.id, gender, education)

#here's another way to label this variable
dat_bfi %>% 
  mutate(
    college = recode(education, "1" = "Noncollege", "2" = "Noncollege", "3" = "Noncollege", .default = "College")
)
dat_bfi %>% 
  select(education)
#the above line of code is how you check you did it right. it lets you see education on its own
#however, it still shows NA values for the missing values. we can label them as such, to make our data more clear

## Let's say we want to convert NA values to an explict value
#we're replacing the text with "unknown"
dat_bfi %>%
  mutate(
    education = recode(education, "1" = "HS", "2" = "HS", .default = "More than HS", .missing = "(Unknown)")
  ) %>%
  select(.id, gender, education)

# tidyr::replace_na()

## If we just want to replace NA values, use `tidyr::replace_na()`

dat_bfi %>%
  mutate(
    education = replace_na(education, replace = "(Unknown)")
  ) %>%
  select(.id, gender, education)




# reverse coding variables
#this line of code will print out the data dictionary, and you can see under "keying" which items need to be reverse coded 
print(dict, n = 30)

#you can do it like this. concatinate each item that needs to be reversed
reversed <- c("A1", "C4", "C5", "E1", "E2", "O2", "O5")

#or if you have a data dictionary you can do it like this
#create a new variable t 
reversed <- dict %>%
  filter(Keying == -1) %>%
  pull(item)

reversed
#this is how you can recode one item at a time
dat_bfi %>%
  mutate(A1r = recode(A1, "6" = 1, "5" = 2, "4" = 3, "3" = 4, "2" = 5, "1" = 6)) %>%
  select(A1, A1r)

#a quicker way to do this would be to say the old value -7 equals the new value
dat_bfi %>%
  mutate(A1r = 7 - A1) %>%
  select(A1, A1r)

#if you want to recode several items at a time this might be a better way to do it
dat_bfi %>%
  mutate(
    across(all_of(reversed),
           ~ recode(.x, "6" = 1, "5" = 2, "4" = 3, "3" = 4, "2" = 5, "1" = 6),
           .names = "{.col}r")
  ) %>%
  select(A1, A1r)
#use the .names argument if you want to keep your original variable that you recoded
#while creating a new variable that is recoded

# Now you try:

## 1. Use the psychTools::bfi (or psych::bfi) data
## 2. Recode gender to 'man', 'women', '(no response)'
## 3. Recode education to "Some HS", "HS", "Some College", "College", "Graduate degree", "(no response)"
## 4. Compute a new variable `hs_grad` with levels "no" and "yes"
## 5. Reverse code the -1 items, as indicated in psychTools::bfi.dictionary or psych::bfi.key
