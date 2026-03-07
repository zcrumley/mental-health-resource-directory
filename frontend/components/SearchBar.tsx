import { View, TextInput, Pressable, Text, StyleSheet, Platform } from "react-native";
import { theme } from "../src/styles/theme";

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    onClear?: () => void;
    placeholder?: string;
};

export default function SearchBar({
    value,
    onChangeText,
    onClear,
    placeholder = "Search..."
}: SearchBarProps)
{
    return (
        <View style={styles.searchWrap}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.muted}
                autoCorrect={false}
                autoCapitalize="none"
                style={[
                    styles.searchInput,
                    Platform.OS === "web" ? ({ outline: "none" } as any) : null
                ]}
            />

            {value.length > 0 && (
                <Pressable
                    onPress={onClear}
                    style={styles.clearBtn}
                >
                    <Text style={styles.clearBtnText}>✕</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchWrap:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme.colors.border
    },

    searchInput:
    {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: theme.colors.text
    },

    clearBtn:
    {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.greenSoft
    },

    clearBtnText:
    {
        fontSize: 16,
        color: theme.colors.green
    }
});