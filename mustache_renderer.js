// Renders some templates in index.html.
// It would probably be better to not do that client side, but to build the website beforehand. But it works and I hate npm, so ..


const TALKS_DATA = [
    {
        id: 0,
        talk_title: "Understanding the Universality Phenomenon in High-Dimensional Estimation and Learning: Some Recent Progress",
        talk_description: "Universality is a fascinating high-dimensional phenomenon. It points to the existence of universal laws that govern the macroscopic behavior of wide classes of large and complex systems, despite their differences in microscopic details. In this talk, I will present some recent progress in rigorously understanding and exploiting the universality phenomenon in the context of statistical estimation and learning on high-dimensional data. Examples include spectral methods for high-dimensional projection pursuit, statistical learning based on kernel and random feature models, approximate message passing algorithms, structured random dimension reduction maps for efficient sketching, and regularized linear regression on highly structured, strongly correlated, and even (nearly) deterministic design matrices. Together, they demonstrate the robustness and wide applicability of the universality phenomenon.",
        talker_name: "Yue M. Lu",
        talker_bio: "Yue M. Lu attended the University of Illinois at Urbana-Champaign, where he received the M.Sc. degree in mathematics and the Ph.D. degree in electrical engineering, both in 2007. After undertaking postdoctoral training at the Audiovisual Communications Laboratory at EPFL, he joined Harvard University, where he is currently Gordon McKay Professor of Electrical Engineering and of Applied Mathematics. His research interests include the mathematical foundations of statistical signal processing and machine learning in high dimensions. His honors include several best paper awards (from the IEEE ICIP, ICASSP, GlobalSIP), the ECE Illinois Young Alumni Achievement Award (2015), and the IEEE Signal Processing Society Distinguished Lecturership (2022).",
        talker_image_path: "assets/images/YueLu.jpeg"

    },
    {
        id: 1,
        talk_title: "A particle beam microscope is not a digital camera",
        talk_description: "A particle beam microscope uses a focused beam of ions or electrons to cause the emission of secondary electrons (SEs) from a sample. A micrograph is formed from the SEs detected during the dwell time of the beam at each raster scan location. It seems innocuous to analogize the microscope with an ordinary digital camera, but with serialized pixel-by-pixel data collection. This is valid in some ways, but it precludes maximum information extraction. Time resolution within each pixel dwell time enables significant improvements without changes to the basic microscope hardware. Several fun and easy theoretical results will be shared, along with progress on the quest to fully demonstrate the merit of this idea.",
        talker_name: "Vivek",
        talker_bio: "Vivek Goyal received his doctoral degree in electrical engineering from the University of California, Berkeley. He was a Member of Technical Staff at Bell Laboratories, a Senior Research Engineer for Digital Fountain, and the Esther and Harold E. Edgerton Associate Professor of Electrical Engineering at MIT. He was an adviser to 3dim Tech, winner of the 2013 MIT $100K Entrepreneurship Competition Launch Contest Grand Prize, and consequently with Google/Alphabet Nest Labs 2014-2016. He is now a Professor and Associate Chair of Doctoral Programs in the Department of Electrical and Computer Engineering at Boston University. Vivek is a Fellow of the American Association for the Advancement of Science (AAAS), IEEE and Optica, and he and his students have been awarded ten IEEE paper awards and eight thesis awards. He is a co-author of Foundations of Signal Processing (Cambridge University Press, 2014).",
        talker_image_path: "assets/images/no_pic.png"
    },
    {
        id: 2,
        talk_title: "From super-resolution to occlusion inpainting - a story of filling missing pixels",
        talk_description: "This talk will cover several methods to estimate missing pixel information. First, I will discuss super-resolution imaging, where the goal is to interpolate intermediate pixels to generate a higher resolution image. Next, we shift our attention to 3D, adding depth information to images. That enables us to create novel views from a different perspective, allowing a viewer to perceive images in 3D. However, novel view synthesis brings new pixels to be filled in: occlusion areas. Occlusion inpainting is the technique to fill in areas of pixels that were invisible from the original point of view. This results in more naturally perceived 3D images.",
        talker_name: "Patrick Vandewalle",
        talker_bio: "Patrick Vandewalle received a MSc degree in electrical engineering from KU Leuven (2001), and a PhD degree from EPFL on super-resolution imaging (2006). From 2007 to 2018, he worked at Philips Research as a senior research scientist. He is now an associate professor at KU Leuven. His current research focuses on 3D processing, reconstruction, computer vision and AR/VR.",
        talker_image_path: "assets/images/patrick.jpg"
    }];

function getTalkDataFromID(talk_id) {
    return TALKS_DATA.filter(d => d.id === talk_id)[0]
}

function renderSessionTalkCards(session_id, talk_ids) {
    let talksData = talk_ids.map(id => getTalkDataFromID(id));
    let template = document.getElementById("template_session_" + session_id);
    template.innerHTML = Mustache.render(template.innerHTML,
        {talks_data: talksData});
    [...template.getElementsByTagName("img")].forEach((e, i) => {
        e.src = talksData[i].talker_image_path
    })

}

renderSessionTalkCards(0, [0, 1, 2])
renderSessionTalkCards(1, [2])
renderSessionTalkCards(2, [0, 1])
