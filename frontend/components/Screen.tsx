import { View, StyleSheet } from "react-native";

export default function Screen({ children }: any)
{
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: "#F6F7FB",
        padding: 16
    }
});