"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-[4.5rem]">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Terms & Conditions</h1>
            <p className="text-sm text-gray-500 mt-1">Last updated: 2026</p>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed text-[15px]">
            <section>
              <h2 className="text-xl font-semibold mb-2">
                1. Use of the Platform
              </h2>
              <p>
                By using Classic Car Center, you agree to use the platform only
                for lawful purposes. You must not post misleading or fraudulent
                listings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
              <p>
                You are responsible for maintaining your account and all
                activities under it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">3. Listings</h2>
              <p>
                You are responsible for the accuracy of the information you
                publish.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">4. Transactions</h2>
              <p>
                All transactions are between users. We are not responsible for
                agreements made.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
              <p>
                We may suspend or terminate accounts that violate our policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">6. Changes</h2>
              <p>
                We may update these terms at any time. Continued use means you
                accept the changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
