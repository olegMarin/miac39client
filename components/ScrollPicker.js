import React, {Component} from 'react';
import ReactNative, {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

    let scrolling = false
    let prevScrolling = false
    let globalEvent
    let fixCount = 0


export default class ScrollPicker extends Component {

    constructor(props){
        super(props);

        this.itemHeight = this.props.itemHeight || 30;
        this.wrapperHeight = this.props.wrapperHeight || (this.props.style ? this.props.style.height : 0) ||this.itemHeight * 5;

        this.state = {
            selectedIndex: this.props.selectedIndex || 0,
            scrolling: false,
            prevScrolling: false,
            globalEvent: {},
            fixCount: 0,
        };
    }

    componentDidMount(){
        if(this.props.selectedIndex){
            setTimeout(() => {
                this.scrollToIndex(this.props.selectedIndex);
            }, 30);
        }
        if(Platform.OS === 'web'){
            setTimeout(() => {
                this.bindInterval = setInterval(()=>{this._contentIsScrolling()},800)
            }, 1000);
        }
    }
    componentWillUnmount(){
        clearInterval(this.bindInterval)
        this.timer && clearTimeout(this.timer);
    }

    render(){
        let {header, footer} = this._renderPlaceHolder();
        let highlightWidth = (this.props.style ? this.props.style.width : 0) || deviceWidth;
        let highlightColor = this.props.highlightColor || '#333';
        let wrapperStyle = {
            height:this.wrapperHeight,
            flex:1,
            backgroundColor:this.props.wrapperColor ||'#fafafa',
            overflow:'hidden',
        };

        let highlightStyle = {
            position:'absolute',
            top:(this.wrapperHeight - this.itemHeight) / 2,
            height:this.itemHeight,
            width:highlightWidth,
            borderTopColor:highlightColor,
            borderBottomColor:highlightColor,
            borderTopWidth:StyleSheet.hairlineWidth,
            borderBottomWidth:StyleSheet.hairlineWidth,
        };

        return (
            <View style={wrapperStyle}>
                <View style={highlightStyle}></View>
                <ScrollView
                    ref={(sview) => { this.sview = sview; }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onMomentumScrollBegin={this._onMomentumScrollBegin.bind(this)}
                    onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
                    onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
                    onScrollEndDrag={this._onScrollEndDrag.bind(this)}
                    onScroll={this._onScrollweb.bind(this)}
                    scrollEventThrottle={800}
                >
                    {header}
                    {this.props.dataSource.map(this._renderItem.bind(this))}
                    {footer}
                </ScrollView>
            </View>
        )
    }

    _contentIsScrolling(){
        if(this.prevScrolling===true&&this.scrolling===false){
                if(this.fixCount===0){
                    //this.setState({fixCount: 1})
                    this.fixCount=0
                    this._scrollFix(this.globalEvent);
                }
            }
       
        //this.setState({prevScrolling: this.state.scrolling, scrolling: false})
        this.prevScrolling=this.scrolling
        console.log('prevScrolling '+this.state.prevScrolling)
        if(this.state.prevScrolling===false){
            //this.setState({fixCount:0})
            this.fixCount=0
        }

        //this.setState({scrolling: false})
        this.scrolling=false
    }

    _onScrollweb(e){
        if(Platform.OS === 'web'){ 
            console.log('_onScrollweb')
            //this.setState({scrolling: true, globalEvent: e})
            this.scrolling = true
            this.globalEvent = e
        }
            
    }



    _renderPlaceHolder(){
        let h = (this.wrapperHeight - this.itemHeight) / 2;
        let header = <View style={{height:h, flex:1,}}></View>;
        let footer = <View style={{height:h, flex:1,}}></View>;
        return {header, footer};
    }

    _renderItem(data, index){
        let isSelected = index === this.state.selectedIndex;
        let item = <Text style={isSelected ? [styles.itemText, styles.itemTextSelected] : styles.itemText}>{data}</Text>;

        if(this.props.renderItem){
            item = this.props.renderItem(data, index, isSelected);
        }

        return (
            <View style={[styles.itemWrapper, {height:this.itemHeight}]} key={index}>
                {item}
            </View>
        );
    }
    _scrollFix(e){
        //console.log(e)
        let y = 0;
        let h = this.itemHeight;
        if(e.nativeEvent.contentOffset){
            y = e.nativeEvent.contentOffset.y;
            if (Platform.OS === 'web') {
                y = e.nativeEvent.contentOffset.y + (this.props.wrapperHeight-this.props.itemHeight)/2
            }
            console.log('положение: '+y)
        }
        let selectedIndex = Math.round(y / h);
        if (Platform.OS === 'web') {
               Math.round(y  / h ); 
            }

        let _y = selectedIndex * h;
        if (Platform.OS === 'web') {
            _y = (selectedIndex * h) - (this.props.wrapperHeight-this.props.itemHeight)/2
        }
        if(_y !== y){
            // using scrollTo in ios, onMomentumScrollEnd will be invoked 
            if(Platform.OS === 'ios'){
                this.isScrollTo = true;
            }
            this.sview.scrollTo({y:_y});
        }
        if(this.state.selectedIndex === selectedIndex){
            return;
        }
        // onValueChange
        if(this.props.onValueChange){
            let selectedValue = this.props.dataSource[selectedIndex];
            this.setState({
                selectedIndex:selectedIndex,
            });
            this.props.onValueChange(selectedValue, selectedIndex);
        }
    }
    _onScrollBeginDrag(e){
        this.dragStarted = true;
        if(Platform.OS === 'ios'){
            this.isScrollTo = false;
        }
        this.timer && clearTimeout(this.timer);
         if(Platform.OS === 'web'){
             this._onMomentumScrollBegin(e)
            }
    }
    _onScrollEndDrag(e){
        this.dragStarted = false;
        // if not used, event will be garbaged
        let _e = {
            nativeEvent:{
                contentOffset:{
                    y: e.nativeEvent.contentOffset.y,
                },
            },
        };
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
            () => {
                if(!this.momentumStarted && !this.dragStarted){
                    this._scrollFix(_e, 'timeout');
                }
            },
            10
        );
        if(Platform.OS === 'web'){
            this._onMomentumScrollEnd(e)
            }
    }
    _onMomentumScrollBegin(e){
        this.momentumStarted = true;
        this.timer && clearTimeout(this.timer);
    }
    _onMomentumScrollEnd(e){
        this.momentumStarted = false;
        console.log(e)
        if(!this.isScrollTo && !this.momentumStarted && !this.dragStarted){
            this._scrollFix(e);
        }
    }

    scrollToIndex(ind){
        this.setState({
            selectedIndex:ind,
        });
        let y = this.itemHeight * ind 
        if (Platform.OS === 'web') {
            y = this.itemHeight * ind - (this.props.wrapperHeight-this.props.itemHeight)/2
        }
        this.sview.scrollTo({y:y});
    }

    getSelected(){
        let selectedIndex = this.state.selectedIndex;
        let selectedValue = this.props.dataSource[selectedIndex];
        return selectedValue;
    }
}

let styles = StyleSheet.create({
    itemWrapper: {
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText:{
        color:'#999',
    },
    itemTextSelected:{
        color:'#333',
    },
});
