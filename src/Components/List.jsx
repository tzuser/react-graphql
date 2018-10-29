/*import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Masonry} from 'gestalt';
import {countColumn} from '_tools'
const mapStateToProps=(state)=>({
  width:state.config.width
})
@connect(mapStateToProps)
class List extends Component{
  render(){
    let {width,comp,items,loadItems,virtualize,minCols}=this.props
    let column=countColumn({minCols,defaultWidth:width});
    return (
    <div style={{width:column.listWidth,margin:'0 auto'}}>
      <Masonry
        comp={comp}
        items={items}
        loadItems={loadItems}
        scrollContainer={()=>window}
        minCols={column.column}
        virtualize={virtualize}
        flexible={true}
        columnWidth={column.width}
        gutterWidth={0}
      />
    </div>
    )
  }
}
export default List*/