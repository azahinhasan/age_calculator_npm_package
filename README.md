## By using of this package you can find out Age from DOB , DOB from age or difference between two date or DOB

### Instruction

```Javascript
import {ageIs,dobIs,differentBetweenTowDate} from '@azahinhasan/age-calculator'
//retrun the age : ageIs(<DOB>)
ageIs('05/05/2021'); //{ year: 1, month: 5, day: 24 }
//retrun the Date : dobIs(<age in obj form>)
//dobIs parameter obj can contain three types of key: month,day,year
dobIs({month:12,day:0}); //2021-10-29T02:55:18.431Z
//return defferent bettween two date or DOB
differentBetweenTowDate('05/05/2021','05/05/2020'); //{ milliseconds: 31536000000, days: 365 }

//OR

const test = require('@azahinhasan/age-calculator')
(test.ageIs('05/05/2021')
test.dobIs({year:1,month:12,day:0})
```

#### More information are coming.