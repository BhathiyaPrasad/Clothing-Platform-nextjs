// components/common/Footer.tsx
import React from 'react';
import Link from 'next/link';
import "../Styles/title.css";
import "../Styles/sizechart.css"

const SizeChart = () => (
  <>
  <div className="overflow-x-auto">
  <table className="table">
  {/* head */}
  <thead>
    <tr>
      <th className='tableheaders'>Size</th>
      <th className='tableheaders'>Bust (cm)</th>
      <th className='tableheaders'>Waist (cm)</th>
      <th className='tableheaders'>Hips (cm)</th>
    </tr>
  </thead>
  <tbody>
   
    <tr>
      <th className='tabledata'>UK 6</th>
      <td className='tabledata'>80</td>
      <td className='tabledata'>62</td>
      <td className='tabledata'>86.5</td>
    </tr>
    
    <tr>
      <th className='tabledata'>UK 8</th>
      <td className='tabledata'>84</td>
      <td className='tabledata'>66</td>
      <td className='tabledata'>90</td>
    </tr>
  
    <tr>
      <th className='tabledata'>UK 10</th>
      <td className='tabledata'>89</td>
      <td className='tabledata'>71</td>
      <td className='tabledata'>95</td>
    </tr>

    <tr>
      <th className='tabledata'>UK 12</th>
      <td className='tabledata'>94</td>
      <td className='tabledata'>76</td>
      <td className='tabledata'>100</td>
    </tr>
  
    <tr>
      <th className='tabledata'>UK 14</th>
      <td className='tabledata'>99</td>
      <td className='tabledata'>81</td>
      <td className='tabledata'>105</td>
    </tr>
   
    <tr>
      <th className='tabledata'>UK 16</th>
      <td className='tabledata'>104</td>
      <td className='tabledata'>86</td>
      <td className='tabledata'>110</td>
    </tr>
  </tbody>
</table>


</div>
</>
);

export default SizeChart;
