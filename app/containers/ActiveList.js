import { connect } from 'react-redux'
import { changeRoom } from '../actions/combin.js'
import item from '../util/item.js'
import ActiveListWrap from './ActiveListWrap.js'
import ListItem from '../components/ListItem.jsx'
import ListItemWrap from './ListItemWrap.js'
import '../less/ActiveList.less'

function handlechangeRoom(){
    const room = this.props.room;
    changeRoom(room.get('isPrivate'))(room.get('_id'));
}

const ActiveListItem = ListItemWrap(ListItem,item.getItemInfo,handlechangeRoom);

export default ActiveListWrap(ActiveListItem)