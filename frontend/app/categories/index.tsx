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
            <View style={styles.screen}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!categories)
    {
        return (
            <View style={styles.screen}>
                <ActivityIndicator />
                <Text style={styles.subtleText}>Loading categories…</Text>
            </View>
        );
    }

    const trimmed = query.trim();

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Resources</Text>
            <Text style={styles.subtitle}>Find The Help You Need</Text>

            {/* Search bar */}
            <View style={styles.searchWrap}>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search resources…"
                    placeholderTextColor="#8A8A8A"
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
        </View>
    );
}

const styles = StyleSheet.create({
    screen:
    {
        flex: 1,
        backgroundColor: "#F6F7FB",
        padding: 16
    },

    title:
    {
        fontSize: 26,
        fontWeight: "800",
        color: "#111"
    },

    subtitle:
    {
        marginTop: 4,
        marginBottom: 14,
        color: "#555",
        fontSize: 14
    },

    errorText:
    {
        color: "#B00020",
        fontSize: 14
    },

    subtleText:
    {
        color: "#666",
        fontSize: 13,
        marginTop: 8
    },

    searchWrap:
    {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E3E6EF",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2
    },

    searchInput:
    {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: "#111"
    },

    clearBtn:
    {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: "#F0F2F7"
    },

    clearBtnText:
    {
        fontSize: 16,
        color: "#333"
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
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#E3E6EF"
    },

    emptyTitle:
    {
        fontSize: 16,
        fontWeight: "700",
        color: "#111"
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
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E3E6EF",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2
    },

    catLabel:
    {
        fontSize: 16,
        fontWeight: "800",
        color: "#111"
    },

    catHint:
    {
        marginTop: 4,
        color: "#6B7280",
        fontSize: 12
    }
});