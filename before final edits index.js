/*let randomize_array = document.getElementById("randomize_array_btn");*/
let sort_btn =document.getElementById('sort_btn');
//let pause_btn =document.getElementById('pause_btn');
let sort_type = document.getElementById('sort_type');
var selected = sort_type.options[sort_type.selectedIndex].text;
let heightFactor= 4;
/*let slider = document.getElementById("slider");
var output = document.getElementById("speed");*/
var speedFactor = 50; //default value
let sort_btn_state = 0;
let minRange = 1;
let maxRange = 100;
let bars_container = document.getElementById("bars_container");
// let slider_numOfBars = document.getElementById("slider_numOfBars");
// var output_numOfBars = document.getElementById("array_size");
let numOfBars = 5; //default
console.log("number of bars", numOfBars);
let unsorted_array = new Array(numOfBars);
let sorted_array = new Array(numOfBars);



function randomNum(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
}


function createRandomArray(numOfBars)
{
    for(let i=0; i< numOfBars; i++){
        unsorted_array[i] = randomNum(minRange, maxRange);
       
    }

    return unsorted_array;
       
}


document.addEventListener("DOMContentLoaded", function () {
/*update_bars();*/    
createRandomArray(numOfBars);
renderBars(unsorted_array, numOfBars);
console.log("First random array", unsorted_array);


});


function renderBars(array, numOfBars)

{

    for (let i=0; i < numOfBars; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");                
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
    
}

function Randomize () {

    unsorted_array = createRandomArray(numOfBars);
    bars_container.innerHTML="";
    renderBars(unsorted_array, numOfBars);
    console.log("New unsorted array",unsorted_array);

}

//*
// randomize_array.addEventListener("click", function Randomize() {
    
//     unsorted_array = createRandomArray(numOfBars);
//     bars_container.innerHTML="";
//     renderBars(unsorted_array, numOfBars);
//     console.log(unsorted_array);
// });


//**BARS SLIDER */

function update_bars() {

    let slider_numOfBars = document.getElementById("slider_numOfBars").value;
    document.getElementById("array_size").innerHTML = slider_numOfBars;
    numOfBars = slider_numOfBars;
    console.log("Updated bars", numOfBars);


}

/*****SPEED SLIDER */
function update_speed(){
    let slider = document.getElementById("slider").value;
    document.getElementById("speed").innerHTML =(40 - slider);
    speedFactor = slider;
    console.log("Updated speed", speedFactor);

}
/*slider_numOfBars.oninput = () => {
    output_numOfBars.innerHTML = slider_numOfBars.value;
    numOfBars = slider_numOfBars.value;
    console.log
}*/


/***Calling sort type ***/

async function sortType () {

    let sort_type = document.getElementById('sort_type');
    var selected = sort_type.options[sort_type.selectedIndex].text;
    let right = unsorted_array.length - 1;

    if (selected ==="Bubble Sort"){
        return await bubbleSort(unsorted_array);
    }
    if (selected === "Selection Sort"){
       return await selectionSort(unsorted_array);
    }
    // if (selected === "Insertion Sort"){
    //     return await insertionSort(unsorted_array);
    // }
     if (selected === 'Heap Sort'){
        return await heapSort(unsorted_array);
    }
    if (selected === "Quick Sort"){
        return await quickSort(unsorted_array, 0, right);
    }
    if (selected === "Merge Sort"){
        return await mergeSort(unsorted_array, 0, right);
    }
    return
}



function Sort () {

    if (sort_btn_state == 0){   
        let right = unsorted_array.length - 1;
        let Randomize_btn = document.getElementById("randomize_array_btn");
        Randomize_btn.disabled = true;
        sort_type.disabled = true;
        document.getElementById("slider").disabled = true;
        document.getElementById("slider_numOfBars").disabled = true;

        sorted_array = sortType ();
        console.log("sorted array",sorted_array);
        console.log("number of bars",numOfBars);
        sort_btn_state = 1;
        sort_btn.innerHTML = "Reset";

    }

    else {
        
        sort_btn_state = 1;
        window.location.reload();

    }
             
     
        
    
       
};




/****DELYAING FUNCTION *****/
function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {  
          /*  
          for (let k = 0; k < bars.length; k++) {
            if (k !== j && k !== j + 1) {
              bars[k].style.backgroundColor = "aqua";
            }
          }*/
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          bars[j].style.height = array[j] * heightFactor + "px";
          bars[j].style.backgroundColor = "blue";
          bars[j].innerText = array[j];
          bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
          bars[j + 1].style.backgroundColor = "yellow";
          bars[j + 1].innerText = array[j + 1];
          await sleep(speedFactor);
        }
      }
      await sleep(speedFactor);
      for (let w = 0; w < array.length; w++){
        bars[w ].style.backgroundColor = "brown";
        bars[w ].innerText = array[w];
      }
      
    }
    return array;
  }




// *** INSERTION SORT *** // 

// async function insertionSort(array)  {  
//     let bars = document.getElementsByClassName("bar");
//     let i, key, j;  
//     n = array.length;
//     for (i = 1; i <n; i++) 
//     {  
//         bars[i].style.backgroundColor = "purple";
        
//         key = array[i];  
//         j = i - 1;
        
//         for (let k = 0; k < array.length; k++)
//         {
//             bars[k].style.backgroundColor = "blue";
//         }

//         while (j >= 0 && array[j] > key) 
        
//         {  
//             array[j + 1] = array[j];              
//             bars[j+1].style.height= array[j+1] * heightFactor + "px";
//             bars[j+1].style.backgroundColor = "yellow";
//             bars[j+1].innerText = array[j + 1];
             

            

//             //bars[j].style.backgroundColor = "green";
            
//             /*
//             for (let k = 0; k < array.length - i; k++){
//                 if (k != j+1) {       
        
//                 bars[k].style.backgroundColor = "blue";
//                     }
           
//             }*/
            
//         await sleep(speedFactor);
//         }
    
//         array[j + 1] = key; 
//         bars[j+1].style.height= array[j + 1] * heightFactor + "px";
//         bars[j+1].style.backgroundColor = "red";
//         bars[j + 1].innerText = key;
//         //await sleep(speedFactor);
        
//         for (let x = 0; x <= i; x++){         

//             bars[x].style.backgroundColor = "brown";
    
//         }      

//     }  
    
//    bars[i-1].style.backgroundColor = "brown";
    
//     return array;
// }  

// *** SELECTION SORT ***///

// async function swap(array,xp, yp)
// {
//     let bars = document.getElementsByClassName("bar");
//     var temp = array[xp];
//     array[xp] = array[yp];    
//     bars[xp].style.height= array[xp] * heightFactor + "px";
//     bars[xp].style.backgroundColor = "red";
//     array[yp] = temp;
//     bars[yp].style.height= array[yp] * heightFactor + "px";
//     bars[yp].style.backgroundColor = "blue";
//     /*await sleep(speedFactor);*/
// }
  
async function selectionSort(array)
{
    let bars = document.getElementsByClassName("bar");
    var i, j, min_idx;

    let n = array.length;
  
    /*One by one move boundary of unsorted subarray*/


    for (i = 0; i < n-1; i++)
      
    {
        /*for(k=0; k<=i;k++){
            bars[k].style.backgroundColor = "aqua";
            }*/
        /*await sleep(speedFactor);*/    
        /*Find the minimum element in unsorted array*/
        min_idx = i;
        bars[i].style.backgroundColor = "white";
        await sleep(speedFactor);
        for (j = i + 1; j < n; j++){
        if (array[j] < array[min_idx])
            min_idx = j;
            bars[j].style.backgroundColor = "pink";
            await sleep(speedFactor);
            
            
        }
  
        //Swap the found minimum element with the first element
        await sleep(speedFactor);
        await swap(array,min_idx, i);
        for(l=0; l<=i+1;l++)
            {
            bars[l].style.backgroundColor = "brown";
            }    

    }
    
    return array;
}

//**** MERGE SORT *****
 
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]

async function merge(array, l, m, r)
{
    let bars = document.getElementsByClassName("bar");

    var n1 = m - l + 1;
    var n2 = r - m;
 
//     Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
//     Copy data to temp arrays L[] and R[]
    
    for (var i = 0; i < n1; i++)
        L[i] = array[l + i];
    for (var i = l; i < m + 1; i++){    
        bars[i].style.height= L[i-l] * heightFactor + "px";
        bars[i].style.backgroundColor = "blue";
        bars[i].innerText = L[i-l];
        await sleep(speedFactor);
        
    }
    for (var j = 0; j < n2; j++)
        R[j] = array[m + 1 + j];
    
    for (var j = m + 1; j <= r; j++){    
        bars[j].style.height= R[j - (m+1)] * heightFactor + "px";
        bars[j].style.backgroundColor = "red";
        bars[i].innerText = R[j-l];
        await sleep(speedFactor);
        }
        
        
//     Merge the temp arrays back into array[l..r]
 
//     Initial index of first subarray
    var i = 0;
 
//     Initial index of second subarray
    var j = 0;
 
//     Initial index of merged subarray
    var k = l;
    
        
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            bars[k].style.height= L[i] * heightFactor + "px";
            bars[k].style.backgroundColor = "yellow";
            bars[k].innerText = L[i];
            i++;
            await sleep(speedFactor);
            
            
        }
        else {
            array[k] = R[j];
            bars[k].style.height= R[j] * heightFactor + "px";
            bars[k].style.backgroundColor = "white";
            bars[k].innerText = R[j];
            j++;
            await sleep(speedFactor);
        }
        k++;
    }
 
//     Copy the remaining elements of
//   L[], if there are any
    while (i < n1) {
        array[k] = L[i];
        bars[k].style.height= L[i] * heightFactor + "px";
        bars[k].style.backgroundColor = "gray";
        bars[k].innerText = L[i];
        i++;
        k++;
        /*await sleep(speedFactor);*/
    }
 
//     Copy the remaining elements of
//    R[], if there are any
    while (j < n2) {
        array[k] = R[j];
        bars[k].style.height= R[j] * heightFactor + "px";
        bars[k].style.backgroundColor = "aqua";
        bars[k].innerText = R[j];
        j++;
        k++;
        /*await sleep(speedFactor);*/
    }

    for (var p = l; p <= r ; p++){    
        bars[p].style.height= array[p] * heightFactor + "px";
        bars[p].style.backgroundColor = "indigo";
        bars[p].innerText = array[p];
        //await sleep(speedFactor);
        }
}

 
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
async function mergeSort(array,l, r){
    
    let bars = document.getElementsByClassName("bar");
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    await mergeSort(array,l,m);
    await mergeSort(array,m+1,r);
    await merge(array,l,m,r);
  
    return array;
}

// // ******Quick Sort****

// // Javascript implementation of QuickSort 
  
  
// // A utility function to swap two elements
async function swap(array, i, j) {
    let bars = document.getElementsByClassName("bar");
    let temp = array[i];
    array[i] = array[j];
    await sleep(speedFactor);
    bars[i].style.height= array[i] * heightFactor + "px";
    bars[i].style.backgroundColor = "indigo";
    bars[i].innerText = array[i];
    array[j] = temp;
    await sleep(speedFactor);
    bars[j].style.height= array[j] * heightFactor + "px";
    bars[j].style.backgroundColor = "gray";
    bars[j].innerText = array[j];
}
  
// /* This function takes last element as pivot, places
//    the pivot element at its correct position in sorted
//    array, and places all smaller (smaller than pivot)
//    to left of pivot and all greater elements to right
//    of pivot */
async function partition(array, low, high) {
    let bars = document.getElementsByClassName("bar");
    // pivot
    let pivot = array[high];    
    bars[high].style.backgroundColor = "pink";
    
  
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
  
        // If current element is smaller 
        // than the pivot
        if (array[j] < pivot) {
            await sleep(speedFactor);
            bars[j].style.backgroundColor = "blue";
  
            // Increment index of 
            // smaller element
            i++;
            await swap(array, i, j);
        }
    }


    await swap(array, i + 1, high);
    for (let k = low; k <= high; k++) {
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "white";
        }
    return (i + 1);
}
  
/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
 */
async function quickSort(array, low, high) {
    let bars = document.getElementsByClassName("bar");
    if (low < high) {

        
        // pi is partitioning index, arr[p]
        // is now at right place 
        let pi = await partition(array, low, high);
  
        // Separately sort elements before
        // partition and after partition
        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
    }
    return array;
}

/// ****Heap Sort***

// JavaScript program for implementation
// of Heap Sort
 
 async function heapSort(array)
    {
        let bars = document.getElementsByClassName("bar");
        var n = array.length;
 
        // Build heap (rearrange array)
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
            await heapify(array, n, i);
            
        // One by one extract an element from heap
        for (var i = n - 1; i > 0; i--) {
            // Move current root to end
            
            var temp = array[0];
            array[0] = array[i];

            
            
            bars[0].style.height= array[0] * heightFactor + "px";
            bars[0].style.backgroundColor = "white";
            bars[0].innerText = array[0];
            array[i] = temp;
            
            bars[i].style.height= array[i] * heightFactor + "px";
            bars[i].style.backgroundColor = "brown";
            bars[i].innerText = array[i];
 
            // call max heapify on the reduced heap
            await heapify(array, i, 0);
            

        }
        
        for (var v = n - 1; v >= 0; v--)
            {            
            bars[v].style.backgroundColor = "brown";
            }
        
        
        return array
        
    }
 
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
   async function heapify(array, n, i)
    {
        let bars = document.getElementsByClassName("bar");
        
        var largest = i; // Initialize largest as root
        var l = 2 * i + 1; // left = 2*i + 1
        var r = 2 * i + 2; // right = 2*i + 2
 
        // If left child is larger than root
        if (l < n && array[l] > array[largest])
            {
            largest = l;
            
            
             await sleep(speedFactor);
            bars[largest].style.backgroundColor = "yellow";
            }
        // If right child is larger than largest so far
        if (r < n && array[r] > array[largest])
            {
            largest = r;
            
            
            await sleep(speedFactor);
            bars[largest].style.backgroundColor = "red";
            }
 
        // If largest is not root
        if (largest != i) {
            var swap = array[i];
            
            array[i] = array[largest];
            
            
             await sleep(speedFactor);
            bars[i].style.height= array[i] * heightFactor + "px";
            bars[i].style.backgroundColor = "indigo";
            bars[i].innerText = array[i];
            array[largest] = swap;
            
            
            
             await sleep(speedFactor);
            bars[largest].style.height = swap * heightFactor + "px";
            bars[largest].style.backgroundColor = "aqua";
            bars[largest].innerText = swap;
 
            // Recursively heapify the affected sub-tree
           await heapify(array, n, largest);
        }
    }






