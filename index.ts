import { Observable, of, from, fromEvent, concat, interval, observable, throwError, Subject} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';
import { mergeMap, filter, tap, catchError, take, takeUntil,
    multicast, refCount, publish, share
} from 'rxjs/operators';


//#region Creating Observables

// let allBooksObservable$ = Observable.create(subscriber => {

//   if (document.title !== 'RxBookTracker') {
//     subscriber.error('Incorrect page title.');
//   }

//   for (let book of allBooks) {
//     subscriber.next(book);
//   }

//   setTimeout(() => {
//     subscriber.complete();
//   }, 2000);

//   return () => console.log('Executing teardown code.');
  
// });

// allBooksObservable$.subscribe(book => console.log(book.title));


// let source1$ = of('hello', 10, true, allReaders[0].name);

// //source1$.subscribe(value => console.log(value));

// let source2$ = from(allBooks);

// //source2$.subscribe(book => console.log(book.title));

// concat(source1$, source2$)
//   .subscribe(value => console.log(value));


// let button = document.getElementById('readersButton');

// fromEvent(button, 'click')
//   .subscribe(event => {
//     console.log(event);

//     let readersDiv = document.getElementById('readers');

//     for (let reader of allReaders) {
//       readersDiv.innerHTML += reader.name + '<br>';
//     }
//   });


// let button = document.getElementById('readersButton');

// fromEvent(button, 'click')
//   .subscribe(event => {
//     ajax('/api/readers')
//       .subscribe(ajaxResponse => {
//         console.log(ajaxResponse);
//         let readers = ajaxResponse.response;

//         let readersDiv = document.getElementById('readers');

//         for (let reader of readers) {
//           readersDiv.innerHTML += reader.name + '<br>';
//         }

//       });
//   });

//#endregion

//#region Using observer and operators
// console.log('Test');

// let currentTime$ = new Observable(subscriber =>{

//     const timeString = new Date().toLocaleDateString();

//     subscriber.next(timeString);
//     subscriber.complete();  
// });

// currentTime$.subscribe(currentTime => {
//     console.log(`observer 1: ${currentTime}`)
// })

// setTimeout(() => {
//     currentTime$.subscribe(currentTime =>{
//         console.log(`observer 2: ${currentTime}`)
//     })
// }, 1000);

// setTimeout(() => {
//     currentTime$.subscribe(currentTime =>{
//         console.log(`observer 3: ${currentTime}`)
//     })
// }, 2000);


// let timesDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// //let timer$ = interval(1000);

// let timer$ = new Observable(sub => {
//     let i = 0;
//     let intervalId = setInterval(() => {
//         sub.next(i++);
//     }, 1000);

//     return () => {
//         console.log('excuting teardown code');
//         clearInterval(intervalId);
//     }
// })

// let timerSub = timer$.subscribe(
//     value => timesDiv.innerHTML += `${new Date().toLocaleDateString()} (${value}) <br>`,
//     null,
//     () => console.log('All done!')
// );

// let timerConsoleSubscription = timer$.subscribe(
//     value => console.log(`${new Date().toLocaleTimeString()} (${value})`)
// );

// timerSub.add(timerConsoleSubscription);

// fromEvent(button, 'click')
//     .subscribe(
//         event => timerSub.unsubscribe()
//     );

// let source$ = of(1,2,3,4,5);

// // source$.subscribe(

// //     value => console.log(value),
// //     error => console.log(error),
// //     () => console.log('complete')
// // )

// let doubler = map(value => value*2);

// let doubled$ = doubler(source$);

// doubled$.subscribe(
//     value => console.log(value)
// )
//#endregion

//#region Using Operators

// ajax('/api/errors/500')
//     .pipe(
//         mergeMap(response => response.response),
//         filter(book => book.publicationYear < 1950),
//         tap(oldbook => console.log(`title: ${oldbook.title}`)),
//         //catchError(err => of({title: 'corduroy', author: 'don freeman'}) )
//         //catchError((error, caught) => caught)
//         //catchError(err => throw `somehting bad happened - ${err.message}`)
//         catchError(err => return throwError(err.message))
//     )
//     .subscribe(
//         finalValue => console.log(`VALUE: ${finalValue.title}`),
//         error => console.log(`ERROR: ${error}`)
//     );

    
// let timesDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// //let timer$ = interval(1000);

// let timer$ = new Observable(sub => {
//     let i = 0;
//     let intervalId = setInterval(() => {
//         sub.next(i++);
//     }, 1000);

//     return () => {
//         console.log('excuting teardown code');
//         clearInterval(intervalId);
//     }
// })

// let cancelTImer$ = fromEvent(button, 'click');

// timer$.pipe(
//     takeUntil(cancelTImer$)
//     )
//     .subscribe(
//     value => timesDiv.innerHTML += `${new Date().toLocaleDateString()} (${value}) <br>`,
//     null,
//     () => console.log('All done!')
// );

//#endregion 

//#region Create your Operators

// function grabAndLogClassics(year, log){
//     return (source$) => {
//         return new Observable(Subscriber =>{
//             return source$.subscribe(
//                 book => {
//                     if(book.publicationYear < year){
//                         Subscriber.next(book);
//                         if(log){
//                             console.log(`classic: ${book.title}`)
//                         }
//                     }
//                 },
//                 err => Subscriber.error(error),
//                 () => Subscriber.complete()
//             )
//         });
//     }
// }

// function grabClasssics(year){
//     return filter(book => book.publicationYear < year)
// }

// ajax('/api/books')
//     .pipe(
//         mergeMap(response => response.response),
//         //filter(book => book.publicationYear < 1950),
//         //tap(oldbook => console.log(`title: ${oldbook.title}`)),
//         grabAndLogClassics(1950, true)
//     )
//     .subscribe(
//         finalValue => console.log(`VALUE: ${finalValue.title}`),
//         error => console.log(`ERROR: ${error}`)
//     );
    
//#endregion

//#region Use subjects

// let subject$ = new Subject();
// subject$.subscribe( 
//     value => console.log(`observer1:  ${value}`)
// )

// subject$.subscribe(
//     value => console.log(`observer2: ${value}`)
// )

// subject$.next('hello');

// let source$ = new Observable(subscriber => {
//     subscriber.next('greattings');
// })

// source$.subscribe(subject$);


let source$ = interval(1000).pipe(
    take(4),
    //multicast(new Subject()),
    // publish(),
    // refCount()
    share()
);

// let subject$ = new Subject();
// source$.subscribe(subject$);

source$.subscribe(
    value => console.log(`observer 1: ${value}`)
)

setTimeout(() => {
    source$.subscribe(
        value => console.log(`observer 2: ${value}`)
    )
    
}, 1000);

setTimeout(() => {
    source$.subscribe(
        value => console.log(`observer 3: ${value}`)
        )
}, 2000);

setTimeout(() => {
    source$.subscribe(
        value => console.log(`observer 4: ${value}`),
        null,
        () => console.log(`observer 4 complete`)
        )
}, 4500);
//source$.connect()
//#endregion