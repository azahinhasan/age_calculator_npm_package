

This package provides easy-to-use utilities for calculating age from a date of birth and determining date of birth from a given age. Perfect for seamless date calculations in your projects.
#
### ✅Functions
- `ageIs`:  This function takes two parameters, both in date format. The first parameter is required and represents the Date of Birth (DOB). The second parameter is optional and specifies the date from which the age will be calculated. If the second parameter is not provided, the function will calculate the age from the current date to the DOB. The function returns `the age or time different in an object format`.
- `dobIs`: This function takes two parameters. The first parameter is required and should be the age in object format. The second parameter is optional and represents the date from which the calculation will start. If the second parameter is not provided, the calculation will default to the current date. The function returns `the Date of Birth in date format`. 
#

###  ✒️Example

```Javascript
const  {ageIs,dobIs} = require('@azahinhasan/age-calculator')

ageIs('05/05/2021','05/05/2022') 
ageIs('05/05/2021') 

dobIs({year:1,month:12,day:0},'11/17/2021')
dobIs({year:1,day:0})
```
```Javascript
import {ageIs} from '@azahinhasan/age-calculator'

ageIs("8/3/2024")
```
`🛑 P.S. please give valid date. Such as: MM/DD/YYYY(if string format) or 2024-07-26T18:00:00.000Z.`
