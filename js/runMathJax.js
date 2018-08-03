(function(document) {
    if ((typeof window.MathJax != 'undefined') && (typeof window.MathJax.Hub != 'undefined')) {
        // Apply MathJax typesetting
        var mathjaxDiv =
            document.getElementById(config.mathjaxProcessingElementId);

        // Apply Markdown parser after MathJax typesetting is complete
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub,
                                  mathjaxDiv]);

        window.MathJax.Hub.Register.StartupHook("End Typeset", function() {
            config.markedOptions.sanitize = false;
            marked.setOptions(config.markedOptions);

            // Decode &lt; and &gt;
            mathjaxData = mathjaxDiv.innerHTML;
            mathjaxData = mathjaxData.replace(/&lt;/g, "<");
            mathjaxData = mathjaxData.replace(/&gt;/g, ">");
            mathjaxData = mathjaxData.replace(/&amp;/g, "&");

            // Convert Markdown to HTML and replace document body
            var html = marked(mathjaxData);
            document.body.innerHTML = html;

            // Remove div used for MathJax processing
            mathjaxDiv.remove();

            for (i = 1; i <= g_seq_id; ++i) {
                var seqid = make_seq_id(i);
                drawSeq(seqid);
            }

            for (i = 1; i <= g_flow_id; ++i) {
                var flowid = make_flow_id(i);
                drawFlow(flowid);
            }
        });

    }
}(document));
