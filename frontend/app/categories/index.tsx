import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Pressable,
    TextInput,
    FlatList,
    StyleSheet,
    Platform
} from "react-native";
import { Link } from "expo-router";
import {
    getCategories,
    searchResources,
    type Category,
    type Resource
} from "../../src/lib/api";
import ResourceCard from "../../components/ResourceCard";
import Screen from "../../components/Screen";
import { theme } from "../../src/styles/theme";
import Header from "../../components/Header";

//this screen shows list of resource categories and the search bar
export default function Categories()
{
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [results, setResults] = useState<Resource[]>([]);
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>
    {
        getCategories()
            .then(setCategories)
            .catch((e) => setError(String(e)));
    }, []);

    useEffect(() =>
    {
        const q = query.trim();

        if (!q)
        {
            setResults([]);
            setSearching(false);
            return;
        }

        setSearching(true);

        const handle = setTimeout(() =>
        {
            searchResources(q)
                .then(setResults)
                .finally(() => setSearching(false));

        }, 250);

        return () => clearTimeout(handle);

    }, [query]);

    if (error)
    {
        return (
            <Screen>
                <Text style={styles.errorText}>{error}</Text>
            </Screen>
        );
    }

    if (!categories)
    {
        return (
            <Screen>
                <ActivityIndicator />
                <Text style={styles.subtleText}>Loading categories…</Text>
            </Screen>
        );
    }

    const trimmed = query.trim();

    return (
        <Screen>

            {/* not really liking how thi header one looks right now */}

           {/* <Header title="Resources" subtitle="Find the help you need" />*/}

            {/* Search bar */}
            <View style={styles.searchWrap}>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search resources…"
                    placeholderTextColor={theme.colors.muted}
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={[
                        styles.searchInput,
                        Platform.OS === "web" ? ({ outline: "none" } as any) : null
                    ]}
                />

                {query.length > 0 && (
                    <Pressable
                        onPress={() =>
                        {
                            setQuery("");
                            setResults([]);
                        }}
                        style={styles.clearBtn}
                    >
                        <Text style={styles.clearBtnText}>✕</Text>
                    </Pressable>
                )}
            </View>

            {searching ? (
                <View style={styles.loadingRow}>
                    <ActivityIndicator />
                    <Text style={styles.subtleText}>Searching…</Text>
                </View>
            ) : null}

            {trimmed ? (
                <>
                    {!searching && results.length === 0 ? (
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyTitle}>No results</Text>
                            <Text style={styles.subtleText}>Try a different keyword.</Text>
                        </View>
                    ) : null}

                    <FlatList
                        data={results}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <ResourceCard resource={item} />}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.listPad}
                    />
                </>
            ) : (
                <View style={styles.grid}>
                    {categories.map((c) => (
                        <Link
                            key={c.key}
                            href={{
                                pathname: "/categories/[category]",
                                params: { category: c.key }
                            }}
                            asChild
                        >
                            <Pressable style={styles.catCard}>
                                <Text style={styles.catLabel}>{c.label}</Text>
                                <Text style={styles.catHint}>Tap to browse</Text>
                            </Pressable>
                        </Link>
                    ))}
                </View>
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    title:
    {
        fontSize: 26,
        fontWeight: "800",
        color: theme.colors.green
    },

    subtitle:
    {
        marginTop: 4,
        marginBottom: 14,
        color: theme.colors.muted,
        fontSize: 14
    },

    errorText:
    {
        color: theme.colors.danger,
        fontSize: 14
    },

    subtleText:
    {
        color: theme.colors.muted,
        fontSize: 13,
        marginTop: 8
    },

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
    },

    loadingRow:
    {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 12
    },

    emptyBox:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.md,
        padding: 14,
        marginTop: 12,
        borderWidth: 1,
        borderColor: theme.colors.border
    },

    emptyTitle:
    {
        fontSize: 16,
        fontWeight: "700",
        color: theme.colors.text
    },

    listPad:
    {
        paddingTop: 12,
        paddingBottom: 24
    },

    grid:
    {
        marginTop: 14,
        gap: 12
    },

    catCard:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: 14,
        borderWidth: 1,
        borderColor: theme.colors.border
    },

    catLabel:
    {
        fontSize: 16,
        fontWeight: "800",
        color: theme.colors.green
    },

    catHint:
    {
        marginTop: 4,
        color: theme.colors.muted,
        fontSize: 12
    }
});