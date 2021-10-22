## About components, pure function ?

1. components take data including functions as inputs.
   it knows the shape of some data object.

   const bookList = {
   name: 'bl1',
   children: ['book1, book2']
   }
   it is aware of the property, name and children.

2. the function implemnet detail may be hiddren from them

## About containers, no pure.

1. have to slightly modify the css
2. the main task is to own the data.

   const useCoin = () => {
   const [side, setSide] = useState(
   Math.random() < 0.5,
   )
   const flip = () => {
   setSide(
   Math.random() < 0.5
   )
   }
   return [side, flip];
   }
   local state.

3. mirror of redux state.
4. dispatch redux action as function.
   may defined the function but does not call them.

## Pages

1. the code and result to be displayed.
   have to be mixed together.
2. it looks like the mix of container and component.

## Lib

1. mostly provide helper function to use the lib,
   or some custom hooks.
2. exception, singleton varaible.
3. exception, preval lib cannot provide use with function becuase it has been excuted.
