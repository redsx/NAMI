import React , {Component} from 'react'
import autobind from 'autobind-decorator'
import { errPrint } from '../actions/combin.js'
import language from '../config/language.js'
import '../less/SearchInput.less'

class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state = {active: false}
        this.isLoading = false;
    }
    @autobind
    handleBlur(){
        this.input.value = '';
        this.setState({active: false});
    }
    @autobind
    handleChange(e){
        if(this.props.handleSearch && !this.state.isLoading){
            const input = e.target.value;
            this.isLoading = true;
            this.props.handleSearch(input)
            .then(ret=>this.isLoading = false)
            .catch(err=>errPrint(err))
        }
    }
    render(){
        const { active } = this.state;
        return (
            <div className = {active? 'SearchInput-active': 'SearchInput'}>
                <input 
                    type = 'text' 
                    className = {active?'SearchInput-input-active':'SearchInput-input'} 
                    placeholder = {active?'': language.searchInput} 
                    ref = {ref=>this.input=ref}
                    onFocus = {()=>{this.setState({active: true})}}
                    onBlur = {this.handleBlur}
                    onChange = {this.handleChange}
                />
                {!active && <label className = 'SearchInput-search-button'><i className = 'icon'>&#xe61e;</i></label>}
                <label className = {active? 'SearchInput-back-button-active':'SearchInput-back-button'}><i className = 'icon'>&#xe65a;</i></label>
            </div>
        );
    }
}

export default SearchInput;