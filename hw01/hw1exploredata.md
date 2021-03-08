exploringpenguins\_hw01
================
Whitney Kasenetz
1/25/2021

## Here I’m exploring *Penguins\!*

``` r
library(palmerpenguins)
penguins
```

    ## # A tibble: 344 x 8
    ##    species island bill_length_mm bill_depth_mm flipper_length_… body_mass_g
    ##    <fct>   <fct>           <dbl>         <dbl>            <int>       <int>
    ##  1 Adelie  Torge…           39.1          18.7              181        3750
    ##  2 Adelie  Torge…           39.5          17.4              186        3800
    ##  3 Adelie  Torge…           40.3          18                195        3250
    ##  4 Adelie  Torge…           NA            NA                 NA          NA
    ##  5 Adelie  Torge…           36.7          19.3              193        3450
    ##  6 Adelie  Torge…           39.3          20.6              190        3650
    ##  7 Adelie  Torge…           38.9          17.8              181        3625
    ##  8 Adelie  Torge…           39.2          19.6              195        4675
    ##  9 Adelie  Torge…           34.1          18.1              193        3475
    ## 10 Adelie  Torge…           42            20.2              190        4250
    ## # … with 334 more rows, and 2 more variables: sex <fct>, year <int>

## I want some more information about the data I’m looking at

``` r
?penguins
```

# How many penguins are there in the dataset?

``` r
nrow(penguins)
```

    ## [1] 344

###### There are 344 penguins

# What kind of information can I find in this dataset?

``` r
names(penguins)
```

    ## [1] "species"           "island"            "bill_length_mm"   
    ## [4] "bill_depth_mm"     "flipper_length_mm" "body_mass_g"      
    ## [7] "sex"               "year"

###### They collected data on the species, island, bill length, bill depth, flipper length, body mass, sex, year

# How many penguins come from each island?

``` r
summary(penguins$island)
```

    ##    Biscoe     Dream Torgersen 
    ##       168       124        52

###### It looks like there are 168 from Biscoe, 124 from Dream, and 52 from Torgersen.
