import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Flag from 'react-native-flags';
//import { NetworkInfo } from 'react-native-network-info';
import { Context } from '../../functions/context'
import { themes } from '../../constants/Colors';
import {
    getMaskToLibPhoneNumber,
    findFirstCountryByCode,
    isCanada,
} from './country_telephone_data';

//const ipstackUrl = 'http://api.ipstack.com/';

/* NetworkInfo.getIPV4Address().then(ipv4Address => {
    ipstackUrl = ipstackUrl + ipv4Address + '?access_key=a2403e5b1e542843a8b8621bd2437586'
}); */


class PhoneMaskInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: '',
            countryCode: '',
            mask: '+999999999999',
            defaultMask: '+999999999999',
            ipstackUrl: 'http://api.ipstack.com/',
        };
    }
    //inputValue: this.props.value,
    componentDidMount() {
        if (this.props.flagSize!='none'){
            fetch('https://api.my-ip.io/ip.json')
            .then(r => r.json())
            .then(rj=>{
                fetch('https://api.ipstack.com/' + rj.ip +'?access_key=9a37899099f821d0c96b61d0ae44c16f')
                    .then(response => response.json())
                    .then(responseJson => {
                        this.updateMaskData(this.props.valueN, responseJson.country_code);
                    })
                    .catch(error => { });
            })
        }else{
            this.setState({mask: this.props.mask})
        }
    }

    updateMaskData = function (inputNumber, visitorCountry) {
        const { countryCode, defaultMask } = this.state;

        let phoneInfo = parsePhoneNumberFromString(inputNumber);
        if (phoneInfo && !phoneInfo.country) {
            switch (phoneInfo.countryCallingCode) {
                case '44': {
                    phoneInfo.country = 'GB';
                    break;
                }
                case '1': {
                    if (inputNumber.match(/\d/g).length > 3)
                        phoneInfo.country = isCanada(inputNumber) ? 'CA' : 'US';
                    break;
                }
            }
        } else if (visitorCountry && !inputNumber) phoneInfo = { country: visitorCountry };
        else if (!phoneInfo && inputNumber.length > 2)
            phoneInfo = { country: findFirstCountryByCode(inputNumber) };

        const computedMask = getMaskToLibPhoneNumber(phoneInfo);
        const computedCountry = phoneInfo ? phoneInfo.country : '';

        if (visitorCountry) {
            if (!inputNumber) inputNumber = computedMask.countryCode;
            this.setState({ visitorCountry: null });
        }

        if (computedMask && computedMask.mask)
            this.setState({
                mask: computedMask.mask,
                country: computedCountry,
                countryCode: computedMask.countryCode,
            });
        else if (countryCode.length > inputNumber.length)
            this.setState({
                mask: defaultMask,
                country: '',
                countryCode: '',
            });

        //this.setState({ inputValue: inputNumber });
        this.props.onChange(inputNumber)
    };

    render() {
        const { placeholder, onChange } = this.props;
        const { mask, country } = this.state;

        return (
            <View style={styles.inputWrapper}>
                <TextInputMask
                    type={'custom'}
                    ref={ref => (this.phoneField = ref)}
                    options={{
                        mask: mask,
                    }}
                    value={this.props.valueN}
                    placeholder={placeholder}
                    onChangeText={(number) => {
                        this.updateMaskData(number);
                        //if (onChange) onChange(number);
                    }}
                    style={{
                        ...styles.input,
                        width: this.props.flagSize!=='none'?183:250,
                        borderBottomRightRadius: this.props.flagSize!=='none'?0:8,
                        borderTopRightRadius: this.props.flagSize!=='none'?0:8,
                        textAlign: this.props.flagSize!=='none'?"left":"center",
                        }}
                    placeholderTextColor={themes[this.context.theme].tabBar}
                    underlineColorAndroid={"rgba(0,0,0,0)"}
                    keyboardType={"phone-pad"}
                />
                {this.props.flagSize!=='none'&&
                <View style={styles.flagWrapper}>
                    {(country) ? <Flag code={country} type={'flat'} size={64} style={styles.flag}/> : <Text/>}
                </View>
                }
            </View>
        );
    }
}
PhoneMaskInput.contextType = Context;



const styles = {
    inputWrapper: {
        height: 44,
        width: 250,
        flexDirection: 'row',
        borderColor: '#0004',
        borderWidth: 2,
        borderRadius: 8,
    },
    flagWrapper: {
        height: 40,
        width: 64,
        backgroundColor: '#fff1',
        //paddingRight: 5,
        borderTopRightRadius: 8, borderBottomRightRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    input: {
        height: 40,
        alignSelf: 'stretch',
        width: 183,
        fontSize: 20,
        paddingLeft: 10,
        color: 'rgba(0,0,0,1)',
        borderTopLeftRadius: 8, borderBottomLeftRadius: 8,
        backgroundColor: '#fff',
    },
    flag: {
        alignSelf: 'center',
        height: 40,
        borderTopRightRadius: 8, borderBottomRightRadius: 8,
    }

};

export default PhoneMaskInput;
