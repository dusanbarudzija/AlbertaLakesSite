import commentsData from './comments.json';
import usersData from './users.json';
import waterbodiesData from './waterbodies.json';
import samplesData from './samples.json';
import sitesData from './sites.json';

const getUsernameById = (userId) => {
    const user = usersData.find(u => u._id === userId);
    return user ? user.username : 'unknown';
};

const getWaterbodyNameById = (wbId) => {
    const wb = waterbodiesData.find(w => w._id === wbId);
    return wb ? wb.name : 'Unknown';
};

const formatDate = (iso) => {
    const d = new Date(iso);
    return `${String(d.getUTCMonth() + 1).padStart(2, '0')}/${String(d.getUTCDate()).padStart(2, '0')}/${d.getUTCFullYear()}`;
};

const getLevel = (cells) => {
    if (cells == null) return "No data";
    if (cells >= 100000) return "High";
    if (cells >= 20000) return "Moderate";
    return "Low";
};

export const reports = commentsData
    .filter(c => c.reviewStatus === "pending")
    .map((c, i) => ({
        id: i + 1,
        username: getUsernameById(c.userId),
        comment: c.commentText,
        date: formatDate(c.commentDateTime),
        status: c.reviewStatus,
    }));

// We don't have pH values in the dataset, so not sure if we want to report this later.
const phByWaterbody = {
    "5349b4ddd2781d08c098900b": "7.2",
    "5349b4ddd2781d08c098900c": "8.1",
    "5349b4ddd2781d08c098900d": "6.9",
};

// Mapping lakes to most recent samples, final page will probably not require all the fields
export const getSavedLocations = (userId) => {
    const user = usersData.find(u => u._id === userId);
    if (!user) return [];

    return user.savedLakes.map((waterbodyId, i) => {
        const waterbody = waterbodiesData.find(w => w._id === waterbodyId);
        const sample = samplesData.find(s => s.waterbodyId === waterbodyId);

        const algaeType = (sample && sample.species && sample.species.length > 0)
            ? sample.species[0].parameter
            : "No data";

        const cellCount = (sample && sample.totalCyanobacterial_cells_mL != null)
            ? sample.totalCyanobacterial_cells_mL
            : null;

        const temp = (sample && sample.waterTemp_C != null)
            ? sample.waterTemp_C + "°C"
            : "No data";

        const ph = phByWaterbody[waterbodyId] || "No data";

        return {
            id: i + 1,
            name: waterbody ? waterbody.name : "Unknown",
            algae: algaeType,
            level: getLevel(cellCount),
            ph: ph,
            temp: temp,
        };
    });
};

// One object per waterbody, joining sites + latest sample
export const lakes = waterbodiesData.map((wb) => {
    const site = sitesData.find(s => s.waterBodyId === wb._id);
    const sample = samplesData.find(s => s.waterbodyId === wb._id);
    const cellCount = sample?.totalCyanobacterial_cells_mL ?? null;

    return {
        id: wb._id,
        name: wb.name,
        imageUrl: wb.imageUrl,
        beachName: site?.beachName ?? null,
        latitude: site?.location.latitude ?? null,
        longitude: site?.location.longitude ?? null,
        level: getLevel(cellCount),
        microcystin: sample?.microcystinLR_ugL ?? null,
        waterTemp: sample?.waterTemp_C ?? null,
    };
});

export const userComments = commentsData
    .filter(c => c.reviewStatus === "approved")
    .map((c, i) => ({
        id: i + 1,
        location: getWaterbodyNameById(c.waterbodyId),
        date: formatDate(c.commentDateTime),
        comment: c.commentText,
    }));
