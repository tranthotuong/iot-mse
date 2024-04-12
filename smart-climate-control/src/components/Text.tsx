import React, { Component } from 'react'
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native'
import * as theme from '../constants/theme';

interface Props {
    center?: boolean,
    right?: boolean,
    color?: string,
    size?: number,
    height?: number,
    weight?: string,
    spacing?: number,
    h1?: boolean,
    welcome?: boolean,
    name?: boolean,
    caption?: boolean,
    medium?: boolean,
    bold?: boolean,
    light?: boolean,
    italic?: boolean,
    button?: boolean,
    style?: StyleProp<TextStyle>,
    children?: React.ReactNode,
}

export default class Typography extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    render() {
        const textStyles = [
            styles.block,
            styles.text,
            this.props.h1 && styles.h1,
            this.props.welcome && styles.welcome,
            this.props.name && styles.name,
            this.props.button && styles.button,
            this.props.center && styles.center,
            this.props.right && styles.right,
            this.props.color && { color: this.props.color },
            this.props.color && this.props.color === 'black' && styles.black,
            this.props.color && this.props.color === 'white' && styles.white,
            this.props.color && this.props.color === 'gray' && styles.gray,
            this.props.size && { fontSize: this.props.size },
            this.props.bold && styles.bold,
            this.props.light && styles.light,
            this.props.caption && styles.caption,
            this.props.height && { lineHeight: this.props.height },
            this.props.weight && { fontWeight: this.props.weight },
            this.props.spacing && { letterSpacing: this.props.spacing },
            this.props.style
        ];

        return (
            <Text style={textStyles} {...this.props}>
                {this.props.children}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    block: {      
    },
    text: {
        fontSize: theme.sizes.sizes.font,
        color: theme.colors.colors.black,
    },
    bold: { fontWeight: 'bold' },
    light: { fontWeight: '200' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    black: { color: theme.colors.colors.black, },
    white: { color: theme.colors.colors.white, },
    gray: { color: theme.colors.colors.gray, },
    welcome: theme.fonts.fonts.welcome,
    h1: theme.fonts.fonts.h1,
    caption: theme.fonts.fonts.caption,    
    name: theme.fonts.fonts.name,
    button: theme.fonts.fonts.button,
});